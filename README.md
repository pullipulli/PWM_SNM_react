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

## Struttura 

### Struttura del backend (mongodb)

Le collections memorizzate nel database (che andremo ad approfondire poco più avanti) sono:

- [artists](#artists) contiene vari artisti memorizzati
- [genres](#genres) contiene tutti i vari generi musicali
- [playlists](#playlists) contiene tutte le playlist degli utenti (sia pubbliche che private, comprese quelle)
- [songs](#songs) contiene tutte le canzoni memorizzate
- [users](#users) contiene tutti i dati degli utenti, comprese le password

#### artists

Contiene un insieme di artisti presi direttamente dall'API di Spotify.
Ogni documento di questa collection contiene:

- **_id**: l'id univoco dell'artista preso dall'API di Spotify
- **artist**: contiene l'intero oggetto ritornato dall'API di Spotify, quindi tutte le informazioni che riguardano il singolo artista

#### genres

Contiene tutti i generi* presi direttamente dall'API di Spotify.
Ogni documento di questa collection contiene:

- **_id**: Il nome del genere è l'id stesso.

*In verità nell'API i generi sono molto di più, semplicemente non vengono restituiti tutti dalla route apposita, quindi sarebbe scomodo andarli a prendere.
Inoltre spesso e volentieri da una canzone non si riesce ad ottenere il genere musicale ad essa collegata.

Ho tentato di prendere il genere dall'artista, ma effettivamente nella maggior parte dei casi il genere non è comunque disponibile, probabilmente per una mancanza di consistenza nell'API pubblica di Spotify.

#### playlists

Contiene un insieme di playlist create dagli utenti di Social Network for Music.
Ogni documento di questa collection contiene:

- **_id**: Contiene due ulteriori campi e identifica univocamente una playlist.
    - **owner**: L'username del proprietario di una playlist
    - **name**: Il nome della playlist
- **description**: una descrizione testuale della playlist
- **privacy**: può valere ```public``` o ```private```, in base al tipo di condivisione che si vuole applicare alla playlist
- **songs**: contiene un array di canzoni (ovvero le canzoni che sono appunto state selezionate dall'utente per una specifica playlist). Hanno la stessa struttura di [songs](#songs)
- **tags**: un array di stringhe che rappresentano appunto i tag associati ad una playlist

#### songs

Contiene un insieme di canzoni prese direttamente dall'API di Spotify.
Ogni documento di questa collection contiene:

- **_id**: l'id univoco della canzone preso dall'API di Spotify
- **song**: contiene l'intero oggetto ritornato dall'API di Spotify, quindi tutte le informazioni che riguardano la singola canzone

#### users

- **_id**: l'id univoco dell'utente (autogenerato da mongodb, anche se in verità l'username o l'email ne fanno comunque le veci)
- **email**: l'email associata all'account di un utente
- **name**: il nome dell'utente
- **surname**: il cognome dell'utente
- **password**: la password (hashata) dell'utente
- **username**: lo username dell'utente
- **favouriteGenres**: un array che contiene i generi preferiti dell'utente
- **favouriteArtists**: un array che contiene gli artisti preferiti dell'utente

### Struttura del backend (Node)

Nel backend, quando bisogna fare una richiesta all'API di Spotify viene usata una fetch per chiedere i dati.

Tutte le routes possibili sono state divise e raggruppate in file diversi in base al tipo di dato che vanno a gestire. Le route sono disponibili nella cartella ```routes``` del backend, e vengono poi inizializzate nell'```index.js```.

Sempre in ```index.js``` viene inizializzata la route per lo swagger (```/api-docs```).

Subito dopo che l'API è pronta, viene fatto una richiesta all'API di Spotify per l'AuthorizationId, poi vengono richiesti i generi musicali (e vengono memorizzati i generi non duplicati). 

In seguito, viene richiesto all'API di scaricare un massimo di 100 canzoni dal mercato italiano, di 5 generi specifici; vengono memorizzate solo le canzoni non già presenti nel database.

Infine, prima di fare unicamente la gestione delle routes, vengono memorizzati tutti gli artisti presenti nelle canzoni del database.

Tutte le route vengono descritte in dettaglio [qui](http://127.0.0.1:3100/api-docs) (con la possibilità anche di provarle in real time).

### Struttura del frontend

