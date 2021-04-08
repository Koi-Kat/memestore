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

async function getMeme(){
  return new Promise( resolve =>{
    con.query("SELECT filename FROM yelp.memeStore",
    function (err, result) {
        if (err) throw err;
        var i = Math.floor(Math.random() * result.length);
        resolve (result[i].filename);
    }); 
  });  
}

function truncateTable() {
  con.query("SELECT filename FROM yelp.memeStore" , 
  function (err, result) {
      if (err) throw err;
      con.query("TRUNCATE TABLE memeStore");
      //make sure to not delete this picture
      insertMeme("animal_pic-1617822915841-138958197.png")
      //the problem with this is that it doesn't delete the files in the folder
      //so there are more images in the folder than the array
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
    imageFilter: imageFilter,
    getMeme : getMeme,
    truncateTable : truncateTable

}



