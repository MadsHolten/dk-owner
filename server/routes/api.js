const express = require('express');
const router = express.Router();

const StardogConn = require('../models/stardog.js');

router.get('/rooms', (req, res, next) => {

    var stardogConn = new StardogConn('P100100');

    var q = "SELECT * WHERE {?s ?p ?o}";

    dbConn = stardogConn.getQuery({query:q})

    return rp(dbConn.options)
        .then(result = console.log(result));

    // console.log(stardogConn);
    

    // data = stardogConn.printStuff()

    res.send("hep");
});

module.exports = router ;