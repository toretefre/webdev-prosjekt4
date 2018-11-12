// Based on https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d

// Initialize express router
let router = require('express').Router();
// Imports MongoClient
let mongo = require('mongodb');
let MongoClient = require('mongodb').MongoClient;

// routing for posting movie ratings
router.put('/:movieid/:rating', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        if (err) {
            throw err
        }

        let db = client.db('movieDB');

        let stringified_movieid = mongo.ObjectID(req.params.movieid);

        db.collection('movieDetails').updateOne(
            { "_id" : stringified_movieid }, 
            { $push: { ratings: parseInt(req.params.rating) } }
        );
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
        db.collection('movieDetails').find().toArray(
            function (err, result) {
                // error handling
                if (err) {
                    res.sendStatus(500);
                    throw err
                }

                // returns json if successful
                else {
                    res.json(result);
                }
            }
        )
    })
});


// Search after title (:8080/movies/numberofMovies/title)
router.get('/:fetchedMovies/:title/', function (req, res) {
    console.log("søk igang!")
    // connects to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        // error handling
        if (err) {
            throw err
        }

        // explains which db to look in
        let db = client.db('movieDB')
        // movieDetails is the name of the collection

        let argument = ".*" + req.params.title + ".*";
        console.log(argument);

        let selected_genre = req.query.genre;
        let selected_imdb_threshold = req.query.threshold;

        db.collection('movieDetails').find({"title":{"$regex":argument, "$options":"i"}}).skip(parseInt(req.params.fetchedMovies)).limit(20).toArray(
            function (err, result) {
                // error handling
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

// Routing for movies/0/Titanic/Drama
router.get('/:fetchedMovies/:title/', function (req, res) {
    console.log("søk igang!")
    // connects to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        // error handling
        if (err) {
            throw err
        }

        // explains which db to look in
        let db = client.db('movieDB')
        // movieDetails is the name of the collection

        let title_argument = ".*" + req.params.title + ".*";
        let genre_argument = ".*" + req.query.genre + ".*";
        console.log("title: " + title_argument + " genre: " + genre_argument);

        db.collection('movieDetails').find({"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}}).skip(parseInt(req.params.fetchedMovies)).limit(20).toArray(
            function (err, result) {
                // error handling
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


router.get('/:fetchedMovies/:title/:genres/:ratingthreshold', function (req, res) {
    console.log("søk igang!")
    // connects to MongoDB
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, client) {
        // error handling
        if (err) {
            throw err
        }

        // explains which db to look in
        let db = client.db('movieDB')
        // movieDetails is the name of the collection

        let title_argument = ".*" + req.params.title + ".*";
        let genre_argument = ".*" + req.params.genres + ".*";
        console.log("title: " + title_argument + " genre: " + genre_argument);

        db.collection('movieDetails').find({"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}}).skip(parseInt(req.params.fetchedMovies)).limit(20).toArray(
            function (err, result) {
                // error handling
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
