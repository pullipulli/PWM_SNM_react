# Relazione del progetto 'Social Network for Music'

- [Relazione del progetto 'Social Network for Music'](#relazione-del-progetto-social-network-for-music)
  - [Informazioni Generali](#informazioni-generali)
    - [Stack tecnologico](#stack-tecnologico)
  - [Setup generale](#setup-generale)
    - [Prerequisiti](#prerequisiti)
    - [Avviare il backend](#avviare-il-backend)
    - [Avviare il frontend (development mode)](#avviare-il-frontend-development-mode)
      - [Production](#production)
      - [Credenziali](#credenziali)
    - [Buildare la documentazione dell'API (swagger)](#buildare-la-documentazione-dellapi-swagger)
  - [Struttura](#struttura)
    - [Struttura del backend (mongodb)](#struttura-del-backend-mongodb)
      - [artists](#artists)
      - [genres](#genres)
      - [playlists](#playlists)
      - [songs](#songs)
      - [users](#users)
    - [Struttura del backend (Node)](#struttura-del-backend-node)
    - [Struttura del frontend](#struttura-del-frontend)
      - [Home](#home)
      - [Register](#register)
      - [Login](#login)
      - [Profile](#profile)
      - [UpdateProfile](#updateprofile)
      - [UserPlaylist](#userplaylist)
      - [Playlist](#playlist)
  - [Possibili miglioramenti](#possibili-miglioramenti)

## Informazioni Generali

- Autore: Andrea Pullia
- Matricola: 962714
- Laurea Triennale in Informatica
- Progetto del corso 'Tecnologie e Linguaggi per il Web'

Il [frontend](https://github.com/pullipulli/PWM_SNM_react)
e il [backend](https://github.com/pullipulli/PWM_SNM_backend)
di questo progetto sono contenuti in due repository diverse su GitHub.

Per la consegna su upload, verrà consegnato uno zip con una cartella per il frontend (`PWM_SNM_react`), una cartella per il backend (`PWM_SNM_backend`) (equivalenti alle repository GitHub descritte sopra) ed un pdf con questa relazione.
Le prove di funzionamento sono descritte in questa relazione.

### Stack tecnologico

Frontend sviluppato con **React Vite** (Javascript).

Backend sviluppato con **NodeJS** ed **express** (Javascript) usando come database **mongodb**. La documentazione dell'API è pubblicata con uno swagger alla route **/api-docs**. Essa è generata grazie all'uso di [swagger-autogen](https://www.npmjs.com/package/swagger-autogen).

## Setup generale

### Prerequisiti

Sia per il backend, che per il frontend, bisogna entrare nella root delle loro directory e lanciare il comando `npm install`:

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

Il backend si aspetta di avere un file `.env` in questo formato (descritto anche nel file `.env.example`):

```
DB_URI=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

In `DB_URI` è da mettere la connection string del database.

`SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET` si ottengono una volta creata un'applicazione sul portale dell'[API di Spotify](https://developer.spotify.com/).

Nel progetto consegnato su upload, è incluso un file `.env` con cui il progetto dovrebbe funzionare totalmente.

### Avviare il backend

```bash
cd PWM_SNM_backend
npm run start
```
Verrà hostato al seguente indirizzo: [http://127.0.0.1:3100/api](http://127.0.0.1:3100/api).

### Avviare il frontend (development mode)

```bash
cd PWM_SNM_react
npm run dev
```
Verrà hostato al seguente indirizzo: [http://127.0.0.1:5000/](http://127.0.0.1:5000/).

#### Production

E' anche possibile creare l'applicazione in production mode, ma non lo ritengo necessario; in qualsiasi caso si dovrebbe utilizzare `npm run build` e poi la directory con l'applicazione pronta all'uso dovrebbe essere in `dist`.

#### Credenziali

Per poter accedere alla piattaforma, nel progetto caricato su upload vi è un file credenziali.txt con alcune credenziali di account creati. Altrimenti si può ovviamente procedere a registrare uno o più utenti da zero.

### Buildare la documentazione dell'API (swagger)

```bash
cd PWM_SNM_backend
npm run swagger
```

Verranno analizzate le routes contenute nel backend e verrà creato in automatico un file `swagger-output.json` sulla base dei commenti contenuti nel backend.
La documentazione finale verrà poi mostrata (una volta avviato il backend) all'indirizzo [http://127.0.0.1:3100/api-docs](http://127.0.0.1:3100/api-docs).

## Struttura 

### Struttura del backend (mongodb)

Le collections memorizzate nel database (che andremo ad approfondire poco più avanti) sono:

- [artists](#artists) contiene vari artisti memorizzati
- [genres](#genres) contiene tutti i vari generi musicali
- [playlists](#playlists) contiene tutte le playlist degli utenti (sia pubbliche che private)
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
- **privacy**: può valere `public` o `private`, in base al tipo di condivisione che si vuole applicare alla playlist
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

Tutte le routes possibili sono state divise e raggruppate in file diversi in base al tipo di dato che vanno a gestire. Le route sono disponibili nella cartella `routes` del backend, e vengono poi inizializzate nell'`index.js`.

Sempre in `index.js` viene inizializzata la route per lo swagger (`/api-docs`).

Subito dopo che l'API è pronta, viene fatta una richiesta all'API di Spotify per l'AuthorizationId, poi vengono richiesti i generi musicali (e vengono memorizzati i generi non duplicati). 

In seguito, viene richiesto all'API di scaricare un massimo di 100 canzoni dal mercato italiano, di 5 generi specifici; vengono memorizzate solo le canzoni non già presenti nel database.

Infine, prima di fare unicamente la gestione delle routes, vengono memorizzati tutti gli artisti presenti nelle canzoni del database.

Tutte le route vengono descritte in dettaglio [qui](http://127.0.0.1:3100/api-docs) (con la possibilità anche di provarle in real time).

### Struttura del frontend

Il frontend utilizza `react-router-dom` per navigare tra le pagine dell'applicazione. Per fare le richieste al backend, viene invece utilizzato `axios`.

Dalla NavBar in alto è possibile accedere alla [Home](#home), a [Login](#login) e a [Register](#register).

Dopo essersi loggati, sulla NavBar invece che Login e Register si avrà [Profile (nomeUtente)](#profile) e un bottone per fare il [Logout](#logout).

#### Home

E' uguale per tutti. Sia per gli utenti che per i guest! Chiunque può vedere le playlist pubbliche.

Se non ci sono playlist pubbliche, si mostra così:
![HomeVuota](/relazioneImages/HomeVuota.png)

Dopo aver introdotto alcune playlist, mostra delle anteprime delle playlist, in questo modo:
![Home](/relazioneImages/Home.png)

Dopo aver filtrato tramite la searchBar:
![HomeFiltrata](/relazioneImages/HomeFiltrata.png)

Per ogni anteprima si può vedere che c'è un bottone per espandere la playlist. Questo porterà alla pagina [Playlist](#playlist).

#### Register

E' una pagina raggiungibile solo quando non si è eseguito l'accesso alla piattaforma. Serve a registrarsi al sito; si presenta inizialmente così:

![RegisterPage](/relazioneImages/Register.png)

In caso di successo, l'utente verrà reindirizzato alla pagina di [Login](#login).

#### Login

E' una pagina raggiungibile solo quando non si è eseguito l'accesso alla piattaforma. Serve ad eseguire l'accesso al sito dopo essersi registrati; si presenta inizialmente così:

![LoginPage](/relazioneImages/Login.png)

Se si verifica qualche errore durante il login, verrà mostrato un errore del genere:

![LoginError](/relazioneImages/LoginErr.png)

Se il login ha invece successo, si verrà reindirizzati alla pagina [Profile](#profile).


#### Profile

Mostra i dettagli del profilo dell'utente che è attualmente connesso; si presenta in questo modo:

![ProfilePage](/relazioneImages/Profile.png)

Se si preme il bottone `Voglio modificare i miei dati`, si verrà reindirizzati alla pagina [UpdateProfile](#updateprofile).

Se si preme il bottone `Voglio eliminare il mio profilo`, verrà eliminato l'account dall'applicazione e si verrà reindirizzati alla pagina di [Login](#login).

Se si preme il bottone `Le mie playlist`, si verrà reindirizzati alla pagina [UserPlaylist](#userplaylist).

#### UpdateProfile

Serve a modificare la propria password e i dati inseriti inizialmente in fase di registrazione dell'utente (escludendo mail, username, nome e cognome). Si presenta così:

![UpdateProfilePage](/relazioneImages/UpdateProfile.png)

Dopo aver inserito i dati correttamente, si verrà reindirizzati sul proprio [Profilo](#profile).

#### UserPlaylist

Serve a visualizzare le anteprime di tutte le proprie playlist (sia pubbliche che private) e ad aggiungere altre playlist. Inizialmente si presenta così:

![UserPlaylistPage](/relazioneImages/UserPlaylist.png)

Dopo aver aggiunto una nuova playlist la pagina si aggiorna così:

![UserPlaylistUpdated](/relazioneImages/UserPlaylistUpdated.png)

#### Playlist

Serve a visualizzare tutti i dati relativi ad una singola playlist (che sia pubblica o privata. Verranno visualizzate solo le playlist a cui si ha effettivamente accesso). Inoltre permette di filtrare le canzoni all'interno delle playlist così da avere una ricerca rapida al suo interno.

Ha un bottone per eliminare la playlist (visualizzato soltanto se si è il proprietario), uno per modificare la playlist (disponibile solo se si è proprietari) e un bottone per copiare la playlist nel proprio profilo (disponibile solo se si è eseguito l'accesso all'applicazione).

Se si prova ad accedere ad un [Profilo](#profile) di un altro utente premendo `by nomeUtente`, verrà visualizzato così:
![ProfilePublicPlaylists](/relazioneImages/ProfilePublicPlaylists.png)

Se si prova ad accedere ad una playlist privata o non esistente: 
![PlaylistAuthError](/relazioneImages/PlaylistAuthError.png)

Visualizzazione di una playlist pubblica da un altro utente:
![PlaylistUserPublic](/relazioneImages/PlaylistUserPublic.png)

Visualizzazione di una playlist pubblica quando non si è stati autenticati:
![PlaylistPublic](/relazioneImages/PlaylistPublic.png)

Visualizzazione di una propria playlist:
![PlaylistSuccess](/relazioneImages/PlaylistSuccess.png)

Se si preme `Preview` all'interno di una canzone, si aprirà un'altra tab del browser in cui ci sarà la preview audio del brano scelto.

Se si preme sul bottone `Elimina Playlist`, verrà eliminata la playlist e si verrà reindirizzati al proprio [Profilo](#profile).

Se si preme sul bottone `Copia Playlist`, verrà copiata totalmente la playlist nel proprio profilo (aggiungendo ' (Copy)' nel nome della playlist) e si verrà reindirizzati al proprio profilo, in cui ci sarà in elenco la playlist appena creata:

| ![PlaylistCopy](/relazioneImages/PlaylistCopy.png) | 
|:--:| 
| Per modificarla poi bisognerà espandere la playlist e modificarla da lì. |

Se si preme sul bottone `Modifica Playlist`, verrà aperta una finestra da cui modificare la playlist:

![PlaylistUpdate](/relazioneImages/PlaylistUpdate.png)

Verrà quindi ricaricata la pagina con i nuovi dati:

![PlaylistAfterUpdate](/relazioneImages/PlaylistAfterUpdate.png)

In qualsiasi caso posso filtrare le canzoni dalla searchBar:

![PlaylistSongFilter](/relazioneImages/PlaylistSongFilter.png)

## Possibili miglioramenti

- Fare una gestione degli errori più precisa. Spesso semplicemente viene assunto che l'utente non sbagli ad inserire le cose;
- Una volta eliminato un utente, sarebbero anche da eliminare tutte le sue playlist;
- Usare JWT per l'autenticazione (sia lato frontend che lato backend) in modo di avere un accesso più sicuro all'applicazione. Ora come ora viene fatto tutto con localStorage, e quindi è tutto facilmente modificabile da browser in pochi click;
- Dare dei codici di errore più significativi e mostrare più errori all'utente (Magari tramite l'uso di uno SnackBar);
- Rendere il sito esteticamente più accattivante; 
- Richiedere ad ogni avvio dell'API le canzoni e i generi è un'operazione pesante, sarebbe da spostare in qualche modo da un'altra parte;
- Per costruire una base di dati più corretta, invece che memorizzare ovunque gli artisti e le canzoni con il loro oggetto per intero, sarebbe stato più sensato memorizzarne solo l'id e all'occorrenza prendere i dati dal database;
- Usare una funzione di hash più sicura rispetto ad md5 (deprecato da tempo). Inoltre sarebbe utile aggiungere un salt prima di hashare la password per evitare un Rainbow Attack.