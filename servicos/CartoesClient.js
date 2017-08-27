var restifyClient = require("restify-clients");

var client = restifyClient.createJsonClient({
    url: "http://localhost/3001",
    version: "~1.0"
});

client.post("/cartoes/autoriza", {hello :"world"} , function (erro, request, response, retorno) {
    console.log("Cosumindo Servico de Cartoes");
    console.log(erro);
    console.log(retorno);
});