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


// Routing for movie search (:8080/0/titanic?genre=Documentary&threshold=5&startindex=0)
router.get('/:title', function (req, res) {
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
        // movieDetails is the name of the collection

        let title_argument = ".*" + req.params.title + ".*";
        let genre_argument = ".*" + req.query.genre + ".*";

        let searchstring = "";

        if (req.query.startindex === undefined) {
            startindex = 0;
            console.log("Startindex undefined, setting to 0");
        }
        else {
            startindex = req.query.startindex;
            console.log("Startindex: " + req.query.startindex);
        }

        if (req.query.genre === undefined && req.query.threshold === undefined) {
            console.log(req.params.title + " requested with no queries");
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}};
        }
        else if (req.query.genre && req.query.threshold === undefined) {
            console.log(req.params.title + " requested with genre " + req.query.genre);
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}};
        }
        else if (req.query.genre === undefined && req.query.threshold) {
            console.log(req.params.title + " requested with threshold " + req.query.threshold);
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "imdb.rating":{$gte: req.query.threshold}};
        }
        else {
            console.log(req.params.title + " requested with genre " + req.query.genre + " and threshold " + req.query.threshold);
            searchstring = {"title":{"$regex":title_argument, "$options":"i"}, "genres":{"$regex":genre_argument, "$options":"i"}, "imdb.rating":{$gte: req.query.threshold}};
        }

        db.collection('movieDetails').find(searchstring).skip(parseInt(req.query.startindex)).limit(20).toArray(
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
