module.exports = function (app) {
    app.get("/pagamentos", function (request, response) {
        console.log("Recebida requisicao de teste na porta 3000");
        response.send("OK");
    })

    app.post("/pagamentos/pagamento", function (request, response) {

        request.assert("forma-de-pagamento","Forma de pagamento obrigatoria").notEmpty();
        request.assert("valor","Valor obrigatorio e deve ser decimal").notEmpty().isFloat();
        
        var errors = request.validationErrors();
        if(errors){
            console.log("Erros de Validacao Encontrados");
            response.status(400).send(errors);
            return;
        }

        var pagamento = request.body;
        console.log("Processando uma requisicao de um novo pagamento");

        pagamento.status = "CRIADO";
        pagamento.data   = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.salva(pagamento, function (erro, results) {
            if(erro){
                console.log("Erro ==> " + erro);
                response.status(400).send(erro);
            }else{
                console.log("Pagamento Criado");
                response.json(pagamento);    
            }
        });

        //response.send(pagamento);
    })
};