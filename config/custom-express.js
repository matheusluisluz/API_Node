var express = require("express"); //carrega o arquivo
var consign = require("consign");//auxilia no carregamento das 
var bodyParser = require("body-parser");

module.exports = function () {
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign()
        .include("/controllers")
        .into(app);
        
    return app;
}