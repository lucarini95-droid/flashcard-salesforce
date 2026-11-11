# Changelog

## v1.2 — 11 novembre 2026
- **Carte riservate**: la pillola 🔒 *Riservate* apre con una password delle carte cifrate in `private.enc.json` (AES-GCM, chiave ricavata con PBKDF2). La password serve una volta per dispositivo; *Opzioni → Blocca le carte riservate* le richiude.
- Ogni categoria può avere la sua domanda per *Parti dalla risposta*.
- Le fonti senza link si mostrano come testo.
- Toccando una categoria, la pillola scelta viene portata in vista anche quando la fila scorre.
- Nuovo `strumenti/privato.mjs` per cifrare e decifrare le carte riservate; `.gitignore` tiene fuori i file in chiaro.

## v1.1 — 11 novembre 2026
- Nuova categoria **Simili a Curasept** al posto di "Casi esteri" e "Casi Italia": una carta su Curasept e 11 casi di aziende simili (Haleon, Pierre Fabre, Chiesi, Fidia e Menarini, Bayer Consumer Health, Sigvaris, ISDIN, Uriach, Adamed, Align, Dental Cremer).
- Tolti i casi generici (Siemens, SaaStr, Telepass, Euronics…); Customer Zero e "Salesforce in Italia" passano nella nuova categoria **Salesforce**.
- Situazioni: i casi da citare ora sono aziende simili a Curasept; aggiunte "quale soluzione per un'azienda di salute orale" e "formazione dei professionisti tra una visita e l'altra".
- Se la categoria salvata non esiste più, l'app torna su "Tutte".
- "Parti dalla risposta": i nomi vengono nascosti anche nei titoli delle sezioni.
- Totale: 68 carte.

## v1.0 — 11 novembre 2026
- Prima versione: 73 carte in 6 categorie (Piattaforma e AI 23, Cloud 10, Settori 7, Casi esteri 12, Casi Italia 9, Situazioni 12), con le fonti su ogni carta.
- Tocco per girare la carta, swipe a destra = la so, a sinistra = da ripassare, annulla.
- Schede Da studiare / Da ripassare / Sapute, giri mescolati, barra delle carte sapute.
- Opzione "Parti dalla risposta": nome nascosto, si indovina prodotto, cliente o situazione.
- Progressi salvati nel browser; carte disponibili anche senza rete dopo la prima apertura.
- Installabile sulla schermata Home; avviso automatico quando esce una nuova versione.
