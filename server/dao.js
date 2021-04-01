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

  var createTable = "CREATE TABLE IF NOT EXISTS rating (ratee VARCHAR(256), stars TINYINT, comment VARCHAR(1024));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


function resultSetToHtml(ratee, stars, comment, spanId){
  return "<span id=\"span-" + spanId + "\">Ratee: " + ratee + "<br>Stars: " + stars + "<br>Comment: " + comment + "</span><br>";
}

module.exports = {
  insertRating: function (ratee, stars, comment) {
    var query = con.query("INSERT INTO rating VALUES ('" + ratee + "', " + stars + ", '" + comment + "');",
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  },

  getResultsAsHtml: async function() {
    return new Promise (function (resolve, reject) {
    con.query("SELECT ratee, stars, comment FROM rating;",
    function (err, result, fields) {
      //I think this is where the problem is but I am too lazy to fix it today. This doesn't resolve anything?
      if (err) return reject(err);

      var html = "";


      for(var n=0; n < result.length; n++){
        html += resultSetToHtml(result[n].ratee, result[n].stars, result[n].comment, n);
      }

      console.log(html);

      resolve(html);
    });
  });
},

  deleteRating: function (ratee, stars, comment) {
    con.query = con.query("DELETE FROM rating WHERE ratee=" + con.escape(ratee) + " AND stars=" + con.espcape(stars) + " AND comment=" + con.escape(comment),
    function (err, result) {
        if (err) throw err;
        console.log("Deleted: " + result);
    });
  }
};