var express = require('express'); //need to jump file to file
var router = express.Router(); // .Router requires a capital RRRRRR
var pool = require('../modules/pool');

router.get('/', function(req, res) { // if it is /message it will not work, you're in the message folder
    // Add a SELECT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('SELECT * FROM jokes;', function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});
router.post('/', function(req, res) {
    var newJoke = req.body;
    console.log('jokes post was hit!');
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO jokes (whoseJoke, jokeQuestion, punchLine) VALUES ($1, $2, $3);', [newJoke.whoseJoke, newJoke.jokeQuestion, newJoke.punchLine], function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

module.exports = router;