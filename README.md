{:toc}

# Frontend

## React

Shit is made with React yo

## MobX

Also used some really really nice and sweaty MobX
Vi bruker MobX og dekoratorsyntaks for lagring av state. I strukturen vår har vi en fil som heter `MovieStore.js`. Her lagres alt av state.

Det som skal lagres i state har dekoratoren `@observable` foran seg. Denne variablene kan hentes ut fra movieStore når som helst. Dersom man endrer en slik variabel, vil dette føre til en re-rendring, på samme måte som setState gjør.

For å hente ut data fra apiet bruker vi axios. Følgende kode kjøres:
```js
@action async fetchMovieData(searchParam) {
        const endpoint = 'http://it2810-32.idi.ntnu.no:8080/movies/'+searchParam;
        await axios.get(endpoint)
            .then(res => {
                if(res.data.error){
                    throw res.data.error;
                }
                this.movies = res.data;
            });
    }
```
Axios sjekker først om det går an å hente ut, og dersom det ikke går blir det sendt ut en feilmelding (i console?). Ellers så blir observable-variabelen movies satt til å være det som hentes ut.

# Backend

## API

Dersom du er tilkoblet NTNU-nett, enten gjennom kabel, eduroam eller VPN, har du tilgang til våre APIer. APIene er REST-baserte, og gir deg filmdata fra et begrenset utvalg av IMDb sin enorme database. Databasen er hentet fra [docs.mongodb.com](https://docs.mongodb.com/charts/master/tutorial/movie-details/prereqs-and-import-data/#download-the-data).

### Eksempler
Spørringen under bør gi deg treff 20-40 for filmer med tittel Battlefield, som har sjangeren Action og en IMDb-rating over eller lik 5.4:

```ít2810-32.idi.ntnu.no:8080/movies/battlefield?genre=action&threshold=5.4&startindex=20```

Du kan også spørre etter alle filmer som tilfredsstiller krav om sjanger, IMDb-rating og startindex. Spørringen under returnerer trekk 40-60 av filmene som har sjangeren Dokumentar med over 8.1 i IMDb-rating.

```ít2810-32.idi.ntnu.no:8080/movies/?genre=Documentary&threshold=8.1&startindex=40```

### Funksjonalitet
APIene er tilgjengelig i nettleser, og du kan sjekke status slik:

```GET ít2810-32.idi.ntnu.no:8080```

Du kan hente ut en komplett JSON over alle oppføringer i databasen med:

```GET ít2810-32.idi.ntnu.no:8080/movies```

Dersom du vil søke i databasen, kan dette utføres med:

```GET ít2810-32.idi.ntnu.no:8080/movies/søketerm``` 

Søketerm er ikke casesensitiv, og sjekker om noen titler inneholder strengen du søker etter.

Dersom du vil filtrere på sjanger kan dette gjøres ved å sette queries som vist under:

```GET ít2810-32.idi.ntnu.no:8080/movies/søketerm?genre=sjanger```

Dersom du vil filtrere på IMDb-rating, der argumentet er minimumsvurdering gjøres det slik:

```GET ít2810-32.idi.ntnu.no:8080/movies/søketerm?threshold=minimumsvurdering```

APIet støtter også infinite scrolling, dette løses ved å gi argumentet startindex. Hvis du vil laste de 20 første treffene kan denne droppes. Dersom du vil laste de neste 20 setter du startindex til 20, som vist under:

```GET ít2810-32.idi.ntnu.no:8080/movies/søketerm?startindex=20```

Vår backend er basert på [Node.js](https://nodejs.org/en/), med [Express](https://expressjs.com/) for håndtering av web requests og [MongoDB](https://www.mongodb.com/) for databaseoperasjoner.

## Express
### Beskrivelse
[Express](https://expressjs.com/) håndterer forespørsler som kommer til server og router disse videre.

### Oppsett
Dersom APIene ikke svarer, kan du starte disse ved å logge på server og kjøre kommandoen:

```cd ../torestef/prosjekt4/server``` 

og deretter:

```node server.js```

I terminalvinduet ditt burde det da dukke opp en melding som forteller deg:

```Running express on port 8080```

Du kan deretter begynne å bruke våre [APIer](Api).

## MongoDB
### Beskrivelse

[MongoDB](https://www.mongodb.com/) er et NoSQL-databasesystem som strukturerer data og lagrer den i JSON-format.

### Oppsett
MongoDB er satt opp på server med sti ``lhome/torestef/prosjekt4``

Vi har brukt mongoimport for å importerere en .tsv-fil fra ImDB som inneholder massevis av filmtitler og informasjon om region og språk.

### Kom i gang

For å koble til serveren kjører du (med Terminal eller PuTTY):

``ssh brukernavn@it2810-32.idi.ntnu.no`` og taster inn NTNU-passordet ditt.

For å komme til MongoDB sitt shell skriver du:

``mongo``

For å gå til riktig database skriver du:

``use movieDB``

Under databaser har vi en collection som heter "movieDetails". For å liste litt derfra kan du skrive:
``db.movieDetails.findOne()`` eller ``db.movieDetails.find()``.

### Eksempel

Vi har også en eksempelspørring. Den gir deg alle filmer med tittel som inneholder "west side story":

```db.movieDetails.find({{ "title" : "west side story" }})```

Dette bør gi deg et svar som ligner på dette:

```
[{"_id":"5b107bec1d2952d0da9046e3","title":"West Side Story","year":1961,"rated":"UNRATED","runtime":152,"countries":["USA"],"genres":["Crime","Drama","Musical"],"director":"Jerome Robbins, Robert Wise","writers":["Ernest Lehman","Arthur Laurents","Jerome Robbins"],"actors":["Natalie Wood","Richard Beymer","Russ Tamblyn","Rita Moreno"],"plot":"Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.","poster":"http://ia.media-imdb.com/images/M/MV5BMTM0NDAxOTI5MF5BMl5BanBnXkFtZTcwNjI4Mjg3NA@@._V1_SX300.jpg","imdb":{"id":"tt0055614","rating":7.6,"votes":67824},"awards":{"wins":18,"nominations":11,"text":"Won 10 Oscars. Another 18 wins & 11 nominations."},"type":"movie"}]
```

### Brukergenererte vurderinger
APIet vårt støtter brukergenererte vurderinger av filmer på en skala der 1 er dårligst og 5 er best. Dette kan testes f.eks. i programmet [Postman](https://www.getpostman.com/).

For å legge inn en brukervurdering av en film er vi avhengige av å ha ObjectID for filmen som skal vurderes. Dette kan du finne ved å titte etter "_id" i JSON-objektet som returneres om du sender en vanlig GET forespørsel til 

```GET it2810-32.idi.ntnu.no/movies/%tittel_på_film_du_søker_etter%```

Når du da skal vurdere filmen sender du en PUT forespørsel til 

```PUT it2810-32.idi.ntnu.no/movies/%ObjectID_for_filmen%/%Rating_mellom_1_og_5%```

APIet validerer foreløpig ikke at man gir gyldig input (1-5) ettersom sikkerhet ikke er en prioritet, men dette er begrenset i frontend, slik at en vanlig bruker ikke kan gjøre annet enn å sende inn 1-5. Dersom vi hadde prioritert sikkerhet ville vi først og fremst ordnet en form for autentisering og deretter lagt på validering.