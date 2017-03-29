var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('./config'),
    mongo = require('./mongo');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(errorHandler);

var url = config.getDBUrl();
console.log('Using Database Url: ' + url);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    app.get('/list', function(req, res){
        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });
    });
    
    app.get('/addmovie', function(req, res, next) {
        res.render('addMovie');
    });
    
    app.post('/addmovie', function(req, res, next) {
        mongo.insertDocument(db, req, function() {
            db.collection('movies').find({}).toArray(function(err, docs) {
                res.render('movies', { 'movies': docs } );
            });
        });
    });
    
    var server = app.listen(3000, function() {
        console.log('Express server listening on port %s.', server.address().port);
    });
});
