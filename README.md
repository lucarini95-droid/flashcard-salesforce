# Flashcard Salesforce

Flashcard per studiare i prodotti Salesforce e i casi cliente, una carta alla volta, con la stessa logica di Swipe Lavoro.

**App:** https://lucarini95-droid.github.io/flashcard-salesforce/

## Come si usa

- **Tocca la carta** per girarla: da un lato la domanda, dall'altro la risposta con le fonti.
- **Scorri a destra** (o ✓) se la sapevi, **a sinistra** (o ✕) se va ripassata.
- **↶** annulla l'ultima scelta, **⟲** gira la carta.
- In alto scegli la **categoria** (Simili a Curasept, Piattaforma e AI, Cloud, Settori, Situazioni, Salesforce) e la **scheda**:
  - *Da studiare*: tutte le carte non ancora sapute
  - *Da ripassare*: solo quelle sbagliate
  - *Sapute*: per ricontrollare quelle che sai già
- Ogni scheda è un **giro** mescolato. A fine giro puoi iniziarne un altro o ripassare solo gli errori.
- **Opzioni → Parti dalla risposta**: vedi la spiegazione con il nome nascosto (▢▢▢) e devi indovinare il prodotto, il cliente, la situazione o la domanda.
- **🔒 Riservate**: alcune carte sono cifrate. Tocca la pillola e scrivi la password: le carte si aprono su quel dispositivo e restano aperte (maiuscole, spazi e trattini nella password non contano). Per richiuderle: *Opzioni → Blocca le carte riservate*.
- Da computer: **spazio** gira, **←** e **→** decidono, **Z** annulla.

I progressi restano **solo su questo dispositivo e in questo browser** (non si sincronizzano tra telefono e Mac). Se cancelli i dati di navigazione di Safari o Chrome, si azzerano.

## Installarla come app sul telefono

- **iPhone (Safari):** apri il link, tocca *Condividi* (il quadrato con la freccia) → *Aggiungi alla schermata Home*.
- **Android (Chrome):** apri il link, menu ⋮ → *Installa app* oppure *Aggiungi a schermata Home*.

Quando esce una nuova versione compare un avviso blu in alto con il tasto *Aggiorna*.

## File

| File | Cosa contiene |
|---|---|
| `index.html` | la pagina: stile, struttura e logica, divisa in blocchi numerati e commentati |
| `cards.json` | il contenuto delle carte |
| `private.enc.json` | le carte riservate, **cifrate** (vedi sotto) |
| `strumenti/privato.mjs` | cifra e decifra le carte riservate |
| `.gitignore` | tiene fuori dal repo i file in chiaro (`*.plain.json`) |
| `manifest.json`, `icon*.png`, `icon.svg`, `apple-touch-icon.png` | icona e impostazioni per l'installazione sul telefono |
| `CHANGELOG.md` | cosa cambia in ogni versione |

## Aggiungere o correggere una carta

Ogni carta in `cards.json` ha questi campi:

```json
{
  "id": "telepass",                 // unico e stabile: i progressi sono legati a questo
  "cat": "simili",                  // simili, ai, cloud, settori, situazioni, azienda
  "tag": "Mobilità · Italia",       // etichetta facoltativa sul fronte
  "fronte": "Telepass: cosa ha fatto con Agentforce?",
  "nome": "Telepass",               // parola nascosta in "Parti dalla risposta"
  "alias": [],                      // altre parole da nascondere
  "retro": [
    {"h": "Problema", "t": "testo"},
    {"h": "Risultati", "l": ["punto 1", "punto 2"]}
  ],
  "fonti": [{"t": "Salesforce · caso Telepass", "u": "https://..."}]
}
```

(I commenti `//` qui sopra servono solo a spiegare: nel file vero non vanno messi.)

Se cambi l'`id` di una carta, i progressi su quella carta ripartono da zero.

Una categoria può avere il campo `inversa`, la domanda mostrata in *Parti dalla risposta*. Una fonte senza `u` si mostra come testo senza link.

## Carte riservate

Le carte riservate sono in `private.enc.json`, **cifrate**: nel repo, che è pubblico, non c'è mai il testo in chiaro e non c'è la password.

- Cifratura: AES-GCM a 256 bit, con la chiave ricavata dalla password tramite PBKDF2-SHA256 (600.000 iterazioni).
- Nella pagina, dopo la password giusta la chiave resta salvata in quel browser, così non serve riscriverla. *Opzioni → Blocca le carte riservate* la cancella.
- Per aggiornarle servono la password e il file in chiaro (stesso formato di `cards.json`, con le sue categorie):

  ```sh
  read -rs PASSWORD_CARTE && export PASSWORD_CARTE      # chiede la password senza mostrarla
  node strumenti/privato.mjs decifra private.enc.json carte.plain.json   # per ripartire da quelle attuali
  node strumenti/privato.mjs cifra carte.plain.json private.enc.json     # dopo le modifiche
  ```

  Con la stessa password i dispositivi già sbloccati continuano a funzionare. I file `*.plain.json` sono esclusi da `.gitignore`: vanno cancellati dopo l'uso e mai caricati su GitHub.

## Versioni e ritorno indietro

- La versione della pagina è la costante `VERSIONE` nel blocco 1 di `index.html`; ogni cambio va annotato in `CHANGELOG.md`.
- Ogni modifica è un commit su GitHub: per tornare a una versione precedente si fa *revert* del commit (o si chiede a Claude di farlo).

## Nota sui contenuti

Numeri e prezzi vengono dalle fonti indicate su ogni carta (soprattutto pagine e comunicati di Salesforce) e sono aggiornati all'11 novembre 2026. Prima di citarli in un colloquio conviene aprire la fonte: alcuni cambiano nel tempo.
