module.exports = function (app) {
    app.get("/pagamentos", function (request, response) {
        console.log("Recebida requisicao de teste na porta 3000");
        response.send("OK");
    })

    app.post("/pagamentos/pagamento", function (request, response) {
        var pagamento = request.body();
        console.log(pagamento);
        response.send("OK");
    })
};