const dao = require('./dao');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');

const { request } = require('https');
const { response } = require('express');
const multer = require('multer');
const { domainToASCII } = require('url');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },

    // add extensions back
    filename: function(req, file, cb) {
        const uniqueSuff = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-'+uniqueSuff + '.png')
    }
});

const upload = multer({ storage: storage, fileFilter: dao.imageFilter })

//these are still /home/user06 because dirname went into server, but I needed to go into public.

app.get('/', (req, res) => {
    res.sendFile('/home/user06/SqlJavaAndHtml/public/whichOne.html')
});

app.get('/css', (req, res) => {
    res.sendFile('/home/user06/SqlJavaAndHtml/public/style.css')
});


//truncate the table 

app.post('/truncateTable', (request, response) => {
    dao.truncateTable();
    response.status(200).send("truncated table!");
})

//get a picture back 

app.get('/getpic', async function (request,response) {
    var meme = await dao.getMeme();
    response.status(200).sendFile(__dirname + "/uploads/"+ meme);
})

//upload a picture
app.post('/upload-pic', upload.single('animal_pic'), (req, res) => {
        dao.insertMeme(req.file.filename);
        res.status(200).send("Inserted new file");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});