'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// require and use "multer"...

const app = express();

app.use(cors());
app.use(fileUpload({}));

app.use('/public', express.static(process.cwd() + '/public'));

// log requests
app.use(({ method, path }, res, next) => {
    console.log(`${method} ${path}`);
    next();
});

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const FILE_INPUT_NAME = 'upfile';

app.post('/api/fileanalyse', function (req, res) {
    const { [FILE_INPUT_NAME]: { name, size, mimetype } } = req.files || { [FILE_INPUT_NAME]: {} };
    res.json({ name, size, type: mimetype });
});

// Not found
app.get('*', function (req, res) {
    res.status(404).send("No file here");
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
