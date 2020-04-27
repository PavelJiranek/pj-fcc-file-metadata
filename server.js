'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// log requests
app.use(({ method, path }, res, next) => {
    console.log(`${method} ${path}`);
    next();
});

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
    res.json({ greetings: "Hello, API" }); // todo analyze file
});

// Not found
app.get('*', function (req, res) {
    res.status(404).send("No file here");
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
