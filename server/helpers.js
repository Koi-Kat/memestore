var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpwQ1!",
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS yelp.memeStore (filename VARCHAR(256));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

function insertMeme(filename) {
    con.query("INSERT INTO yelp.memeStore VALUES ( ? )", [[filename]], 
    function (err, result) {
        if (err) throw err;
        console.log("Inserted filename: " + filename);
    });    
  }

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
module.exports = {
    insertMeme: insertMeme,
    imageFilter: imageFilter
}

