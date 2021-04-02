const helpers = require('./helpers');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');
//require Multer here

const { request } = require('https');
const { response } = require('express');
const multer = require('multer')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage, fileFilter: helpers.imageFilter })

app.get('/', (req, res) => {
    res.sendFile('/home/user06/SqlJavaAndHtml/public/whichOne.html')
});



app.post('/insertChoice', (request, response) => {

    var answer = '<img src="http://emmascats.com/wp-content/uploads/2015/06/5369532260_b63356dc6c_o.jpg" alt="cat" id="food-picture">';
    var randNum = Math.floor(Math.random()*2);


    //i can get files from the original folder, but now how do I get them randomized *and* able to have more put in?
    //An array would be good, but then how do I put the images into an array when they are in a different folder?
    if(randNum == 0)
    {
        answer = '<img src="https://thehappypuppysite.com/wp-content/uploads/2018/10/papillon-names-JK-long.jpg" alt="cat" id="food-picture">';
    }
    else
    {
        answer = '<img src="../server/uploads/profile_pic-1617393605000.png" alt="cinnamoroll" id="food-picture">';
    }
    response.status(200).send(answer);
});

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    //upload.single('profile_pic'),
    // 'profile_pic' is the name of our file input field in the HTML form
    

    /*upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        //returns first else if no matter what. It's not seeing that I'm sending in a picture
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }*/

        // Display uploaded image for user validation
        //res.sendFile(__dirname + "This was the problem. It had nothing to send back");
        //res.send('Hello');

        //The above is not quite necessary, but will keep the server from completely killing itself because of a misclick
        helpers.insertMeme(req.file.filename);
        res.status(200).send("Inserted new file");
    //});
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});