const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//require Multer here

const { request } = require('https');
const { response } = require('express');
const multer = require('multer')
const upload = multer({ dest: 'AddedImgs/'})

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', upload.none(), (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/insertChoice', upload.none(), (request, response) => {

    var answer = '<img src="http://emmascats.com/wp-content/uploads/2015/06/5369532260_b63356dc6c_o.jpg" alt="cat" id="food-picture">';
    var randNum = Math.floor(Math.random()*2);
    if(randNum == 0)
    {
        answer = '<img src="https://thehappypuppysite.com/wp-content/uploads/2018/10/papillon-names-JK-long.jpg" alt="cat" id="food-picture">';
    }
    response.status(200).send(answer);
})

app.post('/insertPics', upload.single('PickFile'), (request, response) => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/AddedImgs')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    var upload = multer({storage: storage})
})
//maybe rename ^ that function to something like getpic?

//make a function to insert an image below that utalizes Multer


//IMPORTANT: look up Multer tutorials. PLEASE

