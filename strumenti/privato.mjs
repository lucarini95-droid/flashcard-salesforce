#!/usr/bin/env node
// Cifra e decifra le carte riservate (private.enc.json).
// La password si passa nella variabile d'ambiente PASSWORD_CARTE, mai come argomento.
//
//   PASSWORD_CARTE=... node strumenti/privato.mjs cifra   carte.plain.json private.enc.json
//   PASSWORD_CARTE=... node strumenti/privato.mjs decifra private.enc.json carte.plain.json
//
// Cifratura: AES-GCM a 256 bit, chiave ricavata dalla password con PBKDF2-SHA256.
// Se private.enc.json esiste già si riusa il suo "salt": con la stessa password la
// chiave resta uguale e i dispositivi già sbloccati continuano a funzionare.
// Il file in chiaro (*.plain.json) non va mai nel repo: è escluso da .gitignore.
import { webcrypto as wc } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ITERAZIONI = 600000;
const [, , azione, da, a] = process.argv;
const pw = process.env.PASSWORD_CARTE;
if(!["cifra", "decifra"].includes(azione) || !da || !a || !pw){
  console.error("uso: PASSWORD_CARTE=... node strumenti/privato.mjs cifra|decifra <da> <a>");
  process.exit(1);
}
// stessa regola della pagina (index.html, blocco 3b): minuscole, solo lettere e numeri
const normalizza = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const b64 = u => Buffer.from(u).toString("base64");
const deB64 = s => new Uint8Array(Buffer.from(s, "base64"));

async function chiave(salt, iter, usi){
  const base = await wc.subtle.importKey("raw", new TextEncoder().encode(normalizza(pw)), "PBKDF2", false, ["deriveKey"]);
  return wc.subtle.deriveKey({name: "PBKDF2", hash: "SHA-256", salt, iterations: iter},
    base, {name: "AES-GCM", length: 256}, false, usi);
}

if(azione === "cifra"){
  const testo = JSON.stringify(JSON.parse(readFileSync(da, "utf8")));   // controlla che sia JSON valido
  const vecchio = existsSync(a) ? JSON.parse(readFileSync(a, "utf8")) : null;
  const salt = vecchio ? deB64(vecchio.salt) : wc.getRandomValues(new Uint8Array(16));
  const iv = wc.getRandomValues(new Uint8Array(12));                    // nuovo a ogni cifratura
  const ct = await wc.subtle.encrypt({name: "AES-GCM", iv}, await chiave(salt, ITERAZIONI, ["encrypt"]),
    new TextEncoder().encode(testo));
  writeFileSync(a, JSON.stringify({v: 1, salt: b64(salt), iv: b64(iv), iter: ITERAZIONI, ct: b64(ct)}) + "\n");
  console.log(`cifrato: ${a}`);
} else {
  const f = JSON.parse(readFileSync(da, "utf8"));
  const chiaro = await wc.subtle.decrypt({name: "AES-GCM", iv: deB64(f.iv)},
    await chiave(deB64(f.salt), f.iter, ["decrypt"]), deB64(f.ct));
  writeFileSync(a, new TextDecoder().decode(chiaro));
  console.log(`decifrato: ${a}`);
}
