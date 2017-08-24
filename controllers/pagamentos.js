module.exports = function (app) {
    app.get("/pagamentos", function (request, response) {
        console.log("Recebida requisicao de teste na porta 3000");
        response.send("OK");
    })

    app.post("/pagamentos/pagamento", function (request, response) {
        var pagamento = request.body;
        console.log("Processando uma requisicao de um novo pagamento");

        pagamento.status = "CRIADO";
        pagamento.data   = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.salva(pagamento, function (erro, results) {
            console.log("ERRO " + erro);
            console.log("Pagamento Criado");
            response.json(pagamento);
        });

        //response.send(pagamento);
    })
};