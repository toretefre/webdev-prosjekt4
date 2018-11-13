// Initialize express router
let router = require('express').Router();
// Imports MongoDB
let mongo = require('mongodb');
// Shorthard for MongoClient
let MongoClient = require('mongodb').MongoClient;


// routing for posting movie ratings
router.put('/:movieid/:rating', function (req, res) {
    // Sets up connection to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        if (err) {
            throw err
        }

        // Selects which database to look in
        let db = client.db('movieDB');

        // Converts movieID to MongoDB compatible format
        let stringified_movieid = mongo.ObjectID(req.params.movieid);

        // Pushes rating to array, and creates the array if noone has rated the movie before.
        db.collection('movieDetails').updateOne(
            { "_id" : stringified_movieid }, 
            { $push: { ratings: parseInt(req.params.rating) } }
        );

        // Returns HTTP OK to the client
        res.sendStatus(200);
    })
});


// Set default API response for (:8080/movies)
router.get('/', function (req, res) {
    // connects to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        // error handling
        if (err) {
            throw err
        }
    
        // explains which db to look in
        let db = client.db('movieDB')
        // movieDetails is the name of the collection

        // Converts the genre argument into regex for starting with or beginning with argument
        let genre_argument = ".*" + req.query.genre + ".*";

        // Displays first results if no startindex is given
        if (req.query.startindex === undefined) {
            startindex = 0;
            console.log("Startindex undefined, setting to 0");
        }

        // Sets variable startindex to startindex of request
        else {
            startindex = req.query.startindex;
            console.log("Startindex: " + req.query.startindex);
        }

        // Sets searchstring if no genre or threshold is requested, first 20 results will be returned
        if (req.query.genre === undefined && req.query.threshold === undefined) {
            console.log("All movies requested with no queries");
            searchstring = "";
        }
        // Sets searchstring if only genre is given
        else if (req.query.genre && req.query.threshold === undefined) {
            console.log("All movies requested with genre " + Number(req.query.genre));
            searchstring = {"genres":{"$regex":genre_argument, "$options":"i"}};
        }
        // Sets searchstring if only IMDb-rating threshold is given
        else if (req.query.genre === undefined && req.query.threshold) {
            console.log("All movies requested with threshold " + req.query.threshold);
            searchstring = {"imdb.rating": {$gte: Number(req.query.threshold) }};
        }
        // Sets searchstring if both genre and threshold is given
        else {
            console.log("All movies requested with genre " + req.query.genre + " and threshold " + Number(req.query.threshold));
            searchstring = {"genres":{"$regex":genre_argument, "$options":"i"}, "imdb.rating": {$gte: Number(req.query.threshold) }};
        }

        // Performs MongoDB lookup limited to 20 results starting from startindex
        db.collection('movieDetails').find(searchstring).skip(parseInt(req.query.startindex)).limit(20).toArray(
            function (err, result) {
                // error handling, returns HTTP 500
                if (err) {
                    res.sendStatus(500);
                    throw err
                }

                // Returns json if successful
                else {
                    res.json(result);
                }
            }
        )
    })
});


// Routing for movie search (:8080/titanic?genre=Documentary&threshold=5&startindex=0)
router.get('/:title', function (req, res) {
    // Simple logging for debugging
    let date = new Date()
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ": Searched for", req.params.title);
    
    // connects to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        // error handling
        if (err) {
            throw err
        }

        // explains which db to look in
        let db = client.db('movieDB')

        // Sets regex based on arguments
        let title_argument = ".*" + req.params.title + ".*";
        let genre_argument = ".*" + req.query.genre + ".*";

        // Initialises searchstring
        let searchstring = "";

        // Sets startindex to 0 if not given in request
        if (req.query.startindex === undefined) {
            startindex = 0;
            console.log("Startindex undefined, setting to 0");
        }
        // Sets startindex to argument given in request
        else {
            startindex = req.query.startindex;
            console.log("Startindex: " + req.query.startindex);
        }

        // Sets searchstring if no genre or threshold is given
        if (req.query.genre === undefined && req.query.threshold === undefined) {
            console.log(req.params.title + " requested with no queries");
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}};
        }
        // Sets searchstring if only genre is given in request
        else if (req.query.genre && req.query.threshold === undefined) {
            console.log(req.params.title + " requested with genre " + Number(req.query.genre));
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}};
        }
        // Sets searchstring if only IMDb-rating threshold is given in request
        else if (req.query.genre === undefined && req.query.threshold) {
            console.log(req.params.title + " requested with threshold " + req.query.threshold);
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "imdb.rating": {$gte: Number(req.query.threshold) }};
        }
        // Sets searchstring if both genre and threshold is given in request
        else {
            console.log(req.params.title + " requested with genre " + req.query.genre + " and threshold " + Number(req.query.threshold));
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}, "imdb.rating": {$gte: Number(req.query.threshold) }};
        }

        // Performs MongoDB lookup limited to 20 results starting from startindex
        db.collection('movieDetails').find(searchstring).skip(parseInt(req.query.startindex)).limit(20).toArray(
            function (err, result) {
                // error handling, returns HTTP 500 if error
                if (err) {
                    res.sendStatus(500);
                    console.log(err)
                }
        
                // returns json if successful
                else {
                    res.json(result);
                }
            }
        )
    })
});


// Export API routes
module.exports = router;