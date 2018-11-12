// Boiler code from https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d

// Import express
let express = require('express');
// Import routes
let apiRoutes = require("./api-routes");
// Import Body parser
let bodyParser = require('body-parser');
// Enable CORS for all requests
let cors = require('cors');

// Initialize the app
let app = express();
// Make app use CORS
app.use(cors());

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Express server is running and responding'));
app.use('/movies', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running express on port " + port);
});

// Configure bodyparser to handle post requests
app.use(
    bodyParser.urlencoded(
        { extended: true })
    );
app.use(bodyParser.json());