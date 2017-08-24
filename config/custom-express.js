var express = require("express"); //carrega o arquivo
var consign = require("consign");//auxilia no carregamento das rotas
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

module.exports = function () {
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());//faz parse do body do corpo da requisicao

    app.use(expressValidator());//permite que faça validacoes

    consign()
        .include("controllers")
        .then("persistencia")
        .into(app);
        
    return app;
}