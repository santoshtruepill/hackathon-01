const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const connection = mongoose.connect('mongodb://127.0.0.1:27017/hackathon-db', {
    useNewUrlParser: true, useUnifiedTopology: true
});
connection
    .then(res => console.log('DB: CONNECTION ESTABLISHED'))
    .catch(error => console.log('DB: CONNECTION FAILED' + error))

/**
 * Parse request
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Cors policy
 */
const options = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '',
    preflightContinue: false
};
app.use(cors(options));

/**
 * Create a write stream and to setup a logger
 */
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

//App route
const appRoutes = require("./routes");

app.use("/", appRoutes);

/**
 * Custom error handler
 * */
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        data: {},
        success: false,
        stack: err.stack
    });
});

/**
 * Create Server
 */
const httpServer = http.createServer(app);
httpServer.listen(6000, () => {
    console.log('API IS UP AND RUNNING');
});
