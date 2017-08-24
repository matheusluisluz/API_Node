var express = require("express"); //carrega o arquivo
var consign = require("consign");//auxilia no carregamento das rotas

module.exports = function () {
    var app = express();

    consign()
        .include("/controllers")
        .into(app);
        
    return app;
}