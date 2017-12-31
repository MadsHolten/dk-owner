const express = require('express');
const bodyParser = require('body-parser');  //For parsing request body
const cors = require('cors');               //Handles Cross Origin Resource Sharing
const rp = require('request-promise');      //NB! NOT USED
const config = require('../config.json');

var app = express();

//Routes
var apiRoutes = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); //Cross Origin Resource Sharing

//Either get port from environment variable or config file
app.set('port', (process.env.PORT || config.port));  

//Static files location
app.use(express.static('./dist'));
app.use(express.static('./data'));

/**
 * GET HOMEPAGE
 */
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

/**
 * ROUTES
 *
 * Authorization routes
 * GET      /rooms           Get rooms
 */
app.use('/api', apiRoutes);

//Handle errors
app.use((err, req, res, next) => {
    if(!err){
        err = 'Something broke!';
    }
    res.send(err);
});

app.listen(app.get('port'), () => {
    console.log('app running on port', app.get('port'));
});
