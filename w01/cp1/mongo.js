var assert = require('assert')
;


var insertDocument = function(db, req, callback) {
  var title = req.body.title;
  var imdb = req.body.imdb;
  var year = req.body.year;
  var collection = db.collection('movies');
  
  collection.insert({"title": title, "imdb": imdb, "year": year},
   function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted a document into the collection");
    callback(result);
  });
}

exports.insertDocument = insertDocument;