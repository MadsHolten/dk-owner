const config = require('../../config.json')

module.exports = class StardogConn {

    constructor(db) {
        if(!config.endpoint.endsWith('/')){
            this.endpoint = config.endpoint+'/';
        }else{
            this.endpoint = config.endpoint;
        }
        this.db = db;

        var user = process.env.STARDOG_USER || 'admin';
        var pw = process.env.STARDOG_PW || 'admin';

        this.options = {
            uri: this.endpoint,
            auth: {
                username: user,
                password: pw
            }
        }
    }

    getQuery(qs){
        var accept = qs.accept ? qs.accept : 'application/sparql-results+json';
        if(accept == 'application/json'){
            accept = 'application/sparql-results+json';
        }
        this.options.method = 'POST';
        this.options.uri += this.db+'/query';
        this.options.form = qs;
        this.options.headers = {
            'Accept': accept
        };
        this.options.json = true; // Automatically parses the JSON string in the response
    }
}