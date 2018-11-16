# Moviebase

- [Funksjonalitet](#funksjonalitet)
- [Frontend](#frontend)
- [Backend](#backend)
- [Testing](#testing)
- [Dokumentasjon](#dokumentasjon)


# Funksjonalitet

Moviebase er en prototype på en webapplikasjon som lar brukeren 
søke i en katalog av filmer.

Brukergrensesnittet (frontend) er basert på rammeverket React og 
tilstandsverktøyet MobX. Presentasjonen av søkeresultat kan vises enten ved
hjelp av fliser / "tiles", eller i tradisjonell listeform, 
dette velges av bruker. Listeformen gir også brukeren mer informasjon om 
hver film, dette inkluderer skuespillere, brukergenererte vurderinger, samt 
spilletid.

Serversiden (backend) er basert på løsningene Node, Express, og MongoDB, og
er driftet av gruppen alene. Alt av filtrering og sortering løses på serverside
ved hjelp av ulike databasekall i MongoDB. Dette sikrer at sortering og 
filtrering utføres på hele resultatsettet, og ikke bare det som 
tilfeldigvis er lastet inn på klienten.

Applikasjonen støtter søk etter tittel, filtrering basert på filmsjanger og 
IMDb-rating, samt alfabetisk sortering etter tittel, og synkende sortering på 
bakgrunn av IMDb-rating. 

Det er også implementert funksjonalitet for brukergenererte vurderinger, 
dette blir gjort på en intuitiv måte ved å klikke på det antallet stjerner
brukeren mener hver film fortjener. Ved klikk vil det komme en popup som 
informerer bruker om handlingen som er utført. Vurderingen lagres deretter 
persistent i databasen, og blir presentert fra og med neste innlasting. 

Applikasjonen går utover det som er presentert i kravspesifikasjonen ved at vi 
har utformet to forskjellige presentasjonsmoduser, listebasert og flisbasert.

Skjermbilde av siden vår:

![GUI](https://imgur.com/tFO9aAq.png)


# Frontend

Brukergrensesnittet vårt er i hovedsak basert på React og MobX, der React er
valgt ut fra læringsmålene, mens MobX er valgt for state management fordi vi 
etter undersøkelser på interett antok at det var enklere å komme i gang med
enn Redux.

## React

Vi  har som i prosjekt 2 valgt å basere vår frontend på React, denne gang i kombinasjon med tilstandshåndteringsverktøyet MobX, noe som førte til at vi i stedet for å bruke create-react-app måtte vi bruke `npx create-react-app project4 --scripts-version custom-react-scripts` da vi opprettet prosjektet. Grunnen til at vi gjorde dette var å for å få tilgang til dekoratorsyntaksen som ble brukt til håndtering av state management i MobX. Dette har ingen negative konsekvenser såvidt vi kan se. 

## MobX

Vi bruker [MobX](https://mobx.js.org/index.html) og dekoratorsyntaks for lagring av state. I strukturen vår har 
vi en fil som heter `MovieStore.js`. Her lagres alt av state.

Det som skal lagres i state har dekoratoren `@observable` foran seg. Denne 
variabelen kan hentes ut fra movieStore når som helst. Dersom man endrer en 
slik variabel, vil dette føre til en re-rendring, på samme måte som 
setState gjør.

I storen bruker vi dekoratorsyntakasen `@action` for funksjoner som modifiserer state.
I vårt tilfelle gjelder dette alle funksjonene. Vi har blant annet funksjoner som endrer state, for å unngå å endre state direkte. Et eksempel er: 

```js
@action setGenre = async (val) => {
        this.genre = val;
        this.fetchedMovies = 0;
        this.movies = [];
        await this.fetchMovieData();
    };
```

Denne funksjonen gjør en endring på genre-state, fetchedMovies-sate og movies-state. Den kjører også `fetchMovieData` på nytt. Denne funksjonen er `async`, og er grunnen til at vi har satt `setGenre` til å være async også. 

## Biblioteker

### Axios

For å hente ut data fra apiet bruker vi [Axios](https://www.npmjs.com/package/axios). Grunnen til at vi valgte Axios er grunnet tidligere erfaringer, det er godt dokumentert og det er simpelt å hente ut data, som forøvrig returneres som en json-fil.

Når vi skal hente ut data fra databasen vår, gjennom apiet, kjører følgende kode:

```js
@action async fetchMovieData(searchParam) {
(...)
        try{
            //Fetching from our database
            await axios.get(this.endpoint)
                .then(res => {
                    this.movies = this.movies.slice().concat(res.data);
                });
        } catch (error) {
            throw error;
        }
    }
```

Axios henter data fra APIet vårt gjennom en endpoint. Denne enpointen varierer utifra hva ønsker å se på nettsiden. Se [Backend-Funksjonalitet](#backend###funksjonlitet) for mer.

### Material-UI

### React Notifications Component

Vi bruker [React Notifications Component](https://www.npmjs.com/package/react-notifications-component) for å gi brukeren tilbakemelding når det er gitt rating på en film. Vi valgte å gå for denne komponenten da den var lett å bruke, og hadde et simpelt design som de fleste kjenner igjen. I tillegg er det viktig for å brukeren å få tilbakemelding på endringer som er gjort. Det var enkelt å opprette en notifikasjon, og vi brukte følgende:

```js
addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Thank for rating the movie!",
            message: "You gave " + this.tempStars + " stars to " + this.props.title + "!    ",
            type: "success",
            insert: "top",
            isMobile: true,
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }
```

Her kunne vi enkelt spesifisere alt fra tittel til hvordan type notifikasjon det skulle være.

### [React Simple Range](https://github.com/tjallen/react-simple-range) 

For å justere IMDB-ratingen det filtreres på, bestemte vi oss for å bruke en slider. Vi fant fort ut at det da var hensiktsmessig å bruke et tredejepartsbibliotek.Etter litt leting og utprøving, falt valget på React Simple Range. Dette fordi det er et simpelt bibliotek, og at det var mye mer lettvint å style slideren med dette biblioteket enn med de andre vi prøvde. I tillegg innehar bibliotek alle funksjonalitetene vi var ute etter. React Simple Range kan implementeres som vist under. Legg merke til at vi ikke gir noen onChange-funksjon, noe som fører til en warning i konsollen som sier at komponenten ikke vil ha noen funksjon uten onChange. Denne kan vi se bort fra, ettersom onChangeComplete gir oss den funksjonaliteten vi trenger.
    
```jsx
<ReactSimpleRange
  id={"slider"}
  label
  onChangeComplete={(element) => this.handleRatingChange(element.value)}
  min={1}
  max={10}
  step={1}
  defaultValue={this.props.movieStore.minRating}
  trackColor={"#000000"}
  thumbColor={"#f5de50"}
  sliderColor={"#f5de50"}
  sliderSize={6}
  thumbSize={13}
 />
``` 

### React Star Ratings

Vi bruker [React Star Ratings](https://www.npmjs.com/package/react-star-ratings) for at brukeren skulle kunne gi rating på en film. Dette lagres persistent i databasen. Denne kompontenen var veldig enkel å bruke, og brukeren trykker på en stjerne for å gi rating. Da vil en melding poppe opp i høyre hjørne, som en tilbakemeldingen på at ratingen er gitt. Komponenten ser slik ut:

```
<StarRatings
  id={"star"+this.props.id}
  starRatedColor="#eac600"
  rating={this.tempStars}
  changeRating={this.onStarClick}
  numberOfStars={5}
  name='rating2'
  starHoverColor={"#eac600"}
  starDimension="20px"
  starSpacing="2px"
/>
```

Funksjonen `putMovieRating` i MovieStore.js blir da kalt og ratingen lagres på databasen. 

### Valg av komponenter

Vi valgte våre frontend-komponenter fordi de var godt dokumenterte og enkle
å komme i gang med. MobX ble særlig valgt over Redux, da Redux mange steder
på internett ble fremstilt som mer omfattende og vanskeligere å komme i gang 
med.

# Backend

Vår backend er basert på [Node.js](https://nodejs.org/en/), med 
[Express](https://expressjs.com/) for håndtering av webforespørsler og 
[MongoDB](https://www.mongodb.com/) for databaseoperasjoner.

## API

Dersom du er tilkoblet NTNU-nett, enten gjennom kabel, eduroam eller VPN, 
har du tilgang til våre APIer. APIene er REST-baserte, og gir deg filmdata 
fra et begrenset utvalg av IMDb sin enorme database. Databasen er hentet fra 
[docs.mongodb.com](https://docs.mongodb.com/charts/master/tutorial/movie-details/prereqs-and-import-data/#download-the-data).

### Eksempler
Spørringen under bør gi deg treff 20-40 for filmer med tittel Battlefield, 
som har sjangeren Action og en IMDb-rating over eller lik 5.4:

```
GET it2810-32.idi.ntnu.no:8080/movies/battlefield?genre=action&threshold=5.4&startindex=20
```

Du kan også spørre etter alle filmer som tilfredsstiller krav om sjanger, 
IMDb-rating og startindex. Spørringen under returnerer trekk 40-60 av filmene 
som har sjangeren Dokumentar med over 8.1 i IMDb-rating.

```
GET it2810-32.idi.ntnu.no:8080/movies/?genre=Documentary&threshold=8.1&startindex=40
```

### Valg av komponenter

Vi valgte våre backend-komponenter fordi de var godt dokumenterte og enkle 
å komme i gang med. Express var definert som i kravspesifikasjon, og var derfor
et opplagt valg. Arbeidet med Express har egentlig gått greit, og programmet er
enket å komme i gang med. 

MongoDB har også fungert bra, og har håndtert våre
volumer uten problem. Etter litt lesing av dokumentasjon fungerer også 
funksjonalitet som filtrering og oppdatering greit.

Vi har i perioder brukt programmet [Postman](https://www.getpostman.com) til å
teste APiene våre, noe som anbefales ettersom man får veldig god oversikt over
hva som skjer ved API-kall og enkelt kan endre på kallene sine.


### Funksjonalitet

APIet er tilgjengelig i nettleser, og du kan sjekke status slik:

```
GET it2810-32.idi.ntnu.no:8080
```

Du kan hente ut en komplett JSON over alle oppføringer i databasen med:

```
GET it2810-32.idi.ntnu.no:8080/movies
```


#### Søking

Dersom du vil søke i databasen, kan dette utføres med:

```
GET it2810-32.idi.ntnu.no:8080/movies/søketerm
``` 

Søketerm er ikke casesensitiv, og sjekker om noen titler inneholder strengen du søker etter.


#### Filtrering

Dersom du vil filtrere på sjanger kan dette gjøres ved å sette queries som vist under:

```
GET it2810-32.idi.ntnu.no:8080/movies/søketerm?genre=sjanger
```

Dersom du vil filtrere på IMDb-rating, der argumentet er minimumsvurdering gjøres det slik:

```
GET it2810-32.idi.ntnu.no:8080/movies/søketerm?threshold=minimumsvurdering
```

APIet støtter også infinite scrolling, dette løses ved å gi argumentet startindex. Hvis du vil laste de 20 første treffene kan denne droppes. Dersom du vil laste de neste 20 setter du startindex til 20, som vist under:

```
GET it2810-32.idi.ntnu.no:8080/movies/søketerm?startindex=20
```


#### Sortering

APIet støtter sortering. Standardsortering er alfabetisk etter tittel, starter fra A.

Dersom du heller vil sortere på IMDb-rating, i synkende rekkefølge legger du til "sort=imdb":

```
GET it2810-32.idi.ntnu.no:8080/movies?sort=imdb
```


#### Brukergenererte vurderinger

APIet vårt støtter brukergenererte vurderinger av filmer på en skala 
der 1 er dårligst og 5 er best. Dette kan testes f.eks. i programmet 
[Postman](https://www.getpostman.com/).

For å legge inn en brukervurdering av en film er vi avhengige av å ha ObjectID 
for filmen som skal vurderes. Dette kan du finne ved å titte etter "_id" i 
JSON-objektet som returneres om du sender en vanlig GET forespørsel til 

```
GET it2810-32.idi.ntnu.no/movies/%tittel_på_film_du_søker_etter%
```

Når du da skal vurdere filmen sender du en PUT forespørsel til 

```
PUT it2810-32.idi.ntnu.no/movies/%ObjectID_for_filmen%/%Rating_mellom_1_og_5%
```

APIet validerer foreløpig ikke at man gir gyldig input (1-5) ettersom sikkerhet 
ikke er en prioritet, men dette er begrenset i frontend, slik at en vanlig 
bruker ikke kan gjøre annet enn å sende inn 1-5. Dersom vi hadde prioritert 
sikkerhet ville vi først og fremst ordnet en form for autentisering 
og deretter lagt på validering.


## Express

### Beskrivelse
[Express](https://expressjs.com/) håndterer forespørsler som kommer til 
server og router disse videre.

### Oppsett

#### Starte server
Dersom APIene ikke svarer, kan du starte disse ved å logge på server og 
kjøre kommandoen:

```
cd ../torestef/prosjekt4/server
``` 

og deretter:

```
node server.js
```

Dersom du vil sørge for at serveren kjører i bakgrunnen legger du til nohup og &:

```
nohup node server.js &
```

I terminalvinduet ditt burde det da dukke opp en melding som forteller deg:

```
Running express on port 8080
```

Du kan deretter begynne å bruke våre [APIer](Api).

#### Stoppe server

Hvis du vil stoppe en serverinstans som kjører i bakgrunnen, logger du på 
serveren, og taster inn en kommando for å vise alle prosesser som kjører på 
serveren:

```
ps ax
```

Her noterer du PID for node-prosessen merket server.js, og setter inn denne i 
kommandoen:

```
kill -9 PID
```

## MongoDB

### Beskrivelse

[MongoDB](https://www.mongodb.com/) er et NoSQL-databasesystem som 
strukturerer data og lagrer den i JSON-format.

### Oppsett
MongoDB er satt opp på server med sti ``lhome/torestef/prosjekt4``

Vi har brukt mongoimport for å importerere en .tsv-fil fra ImDB som 
inneholder massevis av filmtitler og informasjon om region og språk.

### Kom i gang

For å koble til serveren med NTNU-bruker kjører du (med Terminal eller PuTTY):

```
ssh brukernavn@it2810-32.idi.ntnu.no
```

For å komme til MongoDB sitt shell skriver du:

```
mongo
```

For å gå til riktig database skriver du:

```
use movieDB
```

Under databaser har vi en collection som heter "movieDetails". 
For å liste litt derfra kan du skrive:
```
db.movieDetails.find()
```

### Eksempel

Vi har også en eksempelspørring. 
Den gir deg alle filmer med tittel som inneholder "west side story":

```
db.movieDetails.find({{ "title" : "West Side Story" }})
```

Dette bør gi deg et svar som ligner på dette:

```json
[{"_id":"5b107bec1d2952d0da9046e3","title":"West Side Story","year":1961,"rated":"UNRATED","runtime":152,"countries":["USA"],"genres":["Crime","Drama","Musical"],"director":"Jerome Robbins, Robert Wise","writers":["Ernest Lehman","Arthur Laurents","Jerome Robbins"],"actors":["Natalie Wood","Richard Beymer","Russ Tamblyn","Rita Moreno"],"plot":"Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.","poster":"http://ia.media-imdb.com/images/M/MV5BMTM0NDAxOTI5MF5BMl5BanBnXkFtZTcwNjI4Mjg3NA@@._V1_SX300.jpg","imdb":{"id":"tt0055614","rating":7.6,"votes":67824},"awards":{"wins":18,"nominations":11,"text":"Won 10 Oscars. Another 18 wins & 11 nominations."},"type":"movie"}]
```


# Testing

#### Brukstesting

Vi har testet at siden har like funksjonaliteter i følgende nettlesere: 

* Chrome
* Safari
* Vivaldi
* Opera

Vha Chrome developer tools, har vi også testet siden på Galaxy S5, Pixel 2, iPhone X og iPad.
Brukstestingen vår har i stor grad foregått ved at vi har testet funksjonalitet på samme vis i alle de nevnte nettleserne. Under testene har vi fulgt listen over funksjonalitet under, og fått påfølgende resultater:


| Test | Forventet resultat | Resultat |
| --- | --- | --- |
| Søk etter 'Star Wars'. | Alle filmer som inneholder Star Wars i tittelen kommer opp. | Alle filmer som inneholder Star Wars i tittelen kom opp. |
| Trykk på en film. | Man skal få opp mer info om filmen. | Det kom opp mer info om filmen. |
| Trykk på "Clear search"-knappen. | Søket skal bli nullstilt og alle filmer skal vises. | Søket ble nullstilt og alle filmer vises. |
| Bytt sjanger | Kun filmer i den valgte sjangeren skal vises. | Kun filmer i den valgte sjangeren vises. |
| Skru opp minimum IMDb-rating til 5. | Kun filmer med minimum 5 i rating på IMDb skal vises. | Kun filmer med minimum 5 i rating på IMDb vises. |
| Sorter filmene etter IMDb-rating | Filmene skal vises i synkende rekkefølge, ut fra IMDb-rating. | Filmene vises i synkende rekkefølge, ut fra IMDb-rating. |
| Sorter filmene etter tittel. | Filmene skal vises i alfabetisk rekkefølge, ut fra tittel. | Filmene skal vises i alfabetisk rekkefølge, ut fra tittel. | 
| Gi en rating til en film. | Man skal få opp en bekreftelses-notifikasjon, og antall stjerner man gir skal vises helt til siden refreshes. Da skal stjernene bli grå igjen og den totale user-ratingen skal endres. | Man får opp en bekreftelses-notifikasjon, og antall stjerner gitt vises helt til siden ble refreshet. Da skal ble stjernene grå igjen og den totale user-ratingen ble endret. |

Resultatet av alle testene var utelukkende som forventet. Alle funksjonene oppførte seg som de skulle, og vi fant ingen feil eller mangler. 


## Jest

Vi bruker [Jest](https://jestjs.io/) for å teste applikasjonens funksjonalitet og underliggende arkitektur. Dette har vi gjort på det vi selv anser som en god og systematisk måte, som er dokumentert under. Vi har hatt fokus på å oppnå en akseptabel testcoverage, uten å bruke i overkant mye ressursser på dette i henhold til tidsfristen vi har hatt. I tillegg bruker vi [Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html) som gjør det lettere å manipulere React komponenter. 

Ved å kjøre `npm test` i konsoll i den mappen prosjektet ligger vil testene våre kjøres. For å se test-coverage på enhetstestene kan `npm test -- --coverage` kjøres. 

Vi har skrevet følgende enhetstester: 

#### MovieStore-test.

| Test | Beskrivelse |
| ------ | ------ |
| function setSearchParam(test) | Verifiserer at funksjonen setSearchParam fungerer. Kjører funksjonen med "test" som argument og sjekker deretter om variabelen `searchParam` endret seg til test. |
| function setExpandMovie(true) | Verifiserer at funksjonen setExpandMovie med `true` som argument fungerer. Sjekker så at variabelen `expandMovie` endrer seg til `true`. |
| function setExpandMovie(false) | Verifiserer at funksjonen setExpandMovie med `false` som argument fungerer. Sjekker så at variabelen `expandMovie` endrer seg til `false`. |
| function setGenre('Family') | Verifiserer at funksjonen setGenre med "Family" som argument fungerer. Sjekker deretter at variabelen `genre` endret seg til "Family". |
| function setMinRating(8) | Verifiserer at funksjonen setMinRating med 8 som argument fungerer. Sjekker deretter at variabelen `minRating` endret seg til 8.|
| function clearAll() | Verifiserer at funksjonen clearAll fungerer. Setter først en rekke med verdier som sjanger, minrating og søketekst. Kjører deretter funksjonen clearAll, og sjekker at verdiene som ble satt, nå er tilbake til sin opprinnelige verdier.  |
| function increaseFetchedMovies | Verifiserer at funksjonen increaseFetchedMovies fungerer. Funksjonen øker variabelen `fetchedMovies` med 20. Sjekker så at variabelen endret seg til 20. |
| function fetchMovieData | Verifiserer at funksjonen fetchMovieData fungerer. **NB**: Funksjonen henter data fra et faktisk API, og testen vil ikke kjøre dersom man ikke har tilgang til apiet. Setter en rekke verdier som sjanger, minratin og en søketekst. Deretter blir endpointet satt til å hente data med disse satte verdiene. Oppretter så en mock av Axios, og som kjører onGet på data fra et testAPI. Deretter kjøres funksjonen fetchMovieData. Sjekker til slutt av tittelen på filmen som ble hentet fra fetchMovieData, stemmer overens med det mocken av Axios hentet fra testApiet. |
| function putMovieRating | Verifiserer at funksjonen putMovieRating fungerer. Gjør det samme som testen over med å sette ulike variabler. Oppretter en mock av Axios som kjører onPut fra data fra et testAPI. Deretter kjøres funksjonen putMovieRating med de samme verdiene. Når dette har skjedd sjekkes det at ratingen som ble satt inn på testfilmen i funksjonen putMovieRating, stemmer overens med ratingen fra testAPIet.  |

#### Movie-test.

| Test | Beskrivelse |
| ------ | ------ |
| function handleExpandMovie() | Verifiserer at funksjonen handleExpandMovie fungerer, og at movie-containeren går fra å være liten til å bli stor. Finner en film vha ID, og simulerer et klikk på filmen. Sjekker så at det finnes en stor movie container. |
| function onStarClick() | Verifiserer at funksjonen onStarClick fungerer, og at det dukker opp en notifikasjon når den kjøres. Finner en StarRating-komponent vha ID, simulerer en change på den, og sjekker at det finnes en notifikasjon. |


#### App-test.

| Test | Beskrivelse |
| ------ | ------ |
| Switching from gridView to listView | Verifiserer at knappen som endrer layouten til å være listebasert fungerer ved å simulere et klikk på den, og sjekker funksjonen som skal gjøre det blir fyrt av slik at store-verdien expandMovie blir true. |
| Switching from listView to gridVie  | Verifiserer at knappen som endrer layouten til å være gridbasert fungerer ved å simulere et klikk på den, og sjekker funksjonen som skal gjøre det blir fyrt av slik at store-verdien expandMovie blir false. |
| function goToTop() | Verifiserer at knappen som skal sende brukeren helt til toppen av siden fungerer. Finner knappen vha id, simulerer et klikk på den, og sjekker at man er på toppen. |
| function clearAll() | Verifiserer at "clear search"-knappen faktisk clearer søket. Finner knappen, simulerer et klikk på den, og sjekker at alle verdiene har blitt satt tilbake til sine originale verdier. |  

#### Coverage 

Vi hadde som mål å teste majoriteten av de viktigste funksjonene i applikasjonen. Ved å gjøre dette, endte vi opp med en test-coverage på følgende:

![Coverage](https://imgur.com/luqzygl.png)



## Cypress

Vi bruker [Cypress](https://www.cypress.io/) for end-to-end testing. End-to-end testing er viktig for å sjekke flyten nettsiden og at riktig data blir sendt fra databasen, gjennom apiet og ulike komponenter, og fram til det brukeren ser. For å kjøre cypresstestene våres skriver man `npx cypress open` i konsoll i mappen hvor prosjektet ligger. Etter en stund vil et cypresspanel åpnes. Ved å trykke på testen `cypressTest.js` vil cypresstestene våres kjøre. Vi har 6 tester skrevet i cypress. 

Et eksempel på en test: 

```js
it("changes from gridview to listview", function () {
        cy.visit("/");
        cy.get("#displayList")
            .click()
            .get("#mainMovieContainer")
            .should("have.class", "movieContainerBig");
    });
```

Denne testen besøker først nettsiden, og `componentDidMount` kjøres dermed i `App.js`. Dermed vil også `fetchMovieData` i `MovieStore.js` kalles. På denne måten får vi testet om det blir lastet inn data. Målet med testen er å sjekke om det er mulig å endre view. Div'en med id'en `mainMovieContainer` bytter klasse mellom `movieContainerSmall` og `movieContainerBig` for å endre utseende på siden. 

Vi har følgende cypresstester: 

| CypressTest | Beskrivelse |
| ------ | ------ |
| changes genre | Endrer først sjanger på nettsiden til "Western". Sjekker så om verdien i dropdownmenyen endret seg til "Western" |
| search for something | Søker etter film med tittel "Star Wars". Sjekker så om tittelen til den første filmen som kommer opp inneholder ordene "Star Wars" |
| changes from gridview to listview | Trykker først på knappen som endrer view fra gridview til listview. Sjekker så om klassen til diven med id `mainMovieContainer` har endret seg fra `movieContainerSmall` til `movieContainerBig`.|
| changes from listview to gridview | Trykker først på knappen som endrer view fra listview til gridview. Sjekker så om klassen til diven med id `mainMovieContainer` har endret seg fra `movieContainerBig` til `movieContainerSmall`. |
| clears the filters | Setter først en sjanger, trykker på knappen "Clear all filters", og sjekker da om den valgte sjangeren er borte og verdien på sjangerfilteret er "All genres" |
| sorts by imdbrating | Velger først å sortere etter imdbrating. Sjekker så om tittelen på den første filmen er "Bollywood im Alpenrausch". Dette er den filmen i databasen vår som har høyest imdbrating. |

# Dokumentasjon

Når det gjelder dokumentasjon, har vi fokusert svært mye på å gjøre 
koden lett lesbar, og enkel å inspisere for eksterne. 
Dette mener vi er oppnådd gjennom mange og presise kommentarer
der vi mener dette har vært nødvendig, og en gjennomtenkt kodestruktur som skal
gjøre det enkelt å skjønne hva som er gjort hvor.

I Gitlab har vi også fokusert på å holde god struktur, f.eks. gjennom konsis
bruk av Merge Requests og linking mellom issues, commits og merge requests.

Koden for backenden ble i begynnelsen av prosjektet holdt utenfor 
versjonskontroll (Gitlab) da mye av koden ikke var fungerende eller relevant
for de oppgavene vi faktisk skulle løse.