# Relazione

Qui ci sarà la relazione prima di essere convertita in PDF per la consegna:

Serve:

- Una relazione dettagliata (in formato pdf) che illustra la struttura
e presentazione del sito web, come sono state realizzate le operazioni
richieste e le scelte implementative che sono state fatte.
- Delle prove di funzionamento, consistenti in una serie di schermate
dimostrative comprovanti la corretta esecuzione delle operazioni previste

# Relazione del progetto 'Social Network for Music'

## Informazioni Generali

- Autore: Andrea Pullia
- Matricola: 962714
- Laurea Triennale in Informatica
- Progetto del corso 'Tecnologie e Linguaggi per il Web'

Il [frontend](https://github.com/pullipulli/PWM_SNM_react)
e il [backend](https://github.com/pullipulli/PWM_SNM_backend)
di questo progetto sono contenuti in due repository diverse su GitHub.

Per la consegna su upload, verrà consegnato uno zip con una cartella frontend, una cartella backend (equivalenti alle repository GitHub descritte sopra) ed un pdf con questa relazione.
Le prove di funzionamento saranno contenute in questa relazione.

Frontend sviluppato con **React Vite** (Javascript).

Backend sviluppato con **NodeJS** ed **express** (Javascript) usando come database **mongodb**. La documentazione dell'API è pubblicata con uno swagger alla route **/api-docs**. Essa è generata grazie all'uso di [swagger-autogen](https://www.npmjs.com/package/swagger-autogen)

## Setup generale

### Prerequisiti

Sia per il backend, che per il frontend, bisogna entrare nella root delle loro directory e lanciare il comando ```npm install```:

Per il frontend:

```bash
cd PWM_SNM_react
npm install
 ```

 Per il backend:
 ```bash
cd PWM_SNM_backend
npm install
 ```

Il backend si aspetta di avere un file ```.env``` in questo formato (descritto anche nel file ```.env.example```) :

```
DB_URI=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

In ```DB_URI``` è da mettere il la connection string del il database.

```SPOTIFY_CLIENT_ID``` e ```SPOTIFY_CLIENT_SECRET``` si ottengono una volta creata un'applicazione sul portale dell'[API di Spotify](https://developer.spotify.com/).

Nel progetto consegnato su upload, è incluso un file **.env** con cui il progetto dovrebbe funzionare totalmente.

### Avviare il backend

```bash
cd PWM_SNM_backend
npm run start
```
Verrà hostato al seguente indirizzo: [http://127.0.0.1:3100/api](http://127.0.0.1:3100/api)

### Avviare il frontend (development mode)

```bash
cd PWM_SNM_react
npm run dev
```
Verrà hostato al seguente indirizzo: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

Per poter accedere alla piattaforma, nel progetto caricato su upload vi è un file credenziali.txt con alcune credenziali di account creati. Altrimenti si può ovviamente procedere a registrare uno o più utenti da zero.

### Buildare la documentazione dell'API (swagger)

```bash
cd PWM_SNM_backend
npm run swagger
```

Verranno analizzate le routes contenute nel backend e verrà creato in automatico un file ```swagger-output.json``` sulla base dei commenti contenuti nel backend.
La documentazione finale verrà poi mostrata (una volta avviato il backend) all'indirizzo [http://127.0.0.1:3100/api-docs](http://127.0.0.1:3100/api-docs).