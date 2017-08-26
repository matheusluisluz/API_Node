module.exports = function (app) {

    const PAGAMENTO_CRIADO = "CRIADO";
    const PAGAMENTO_CONFIRMADO = "CONFIRMADO";
    const PAGAMENTO_CANCELADO  = "CANCELADO";

    app.get("/pagamentos", function (request, response) {
        console.log("Recebida requisicao de teste na porta 3000");
        response.send("OK");
    });

    app.delete("/pagamentos/pagamento/:id",function (request, response) {
        var pagamento = {};
        var id = request.params.id;
        
        pagamento.id = id;
        pagamento.status = PAGAMENTO_CANCELADO;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.atualiza(pagamento, function (erro) {
            if(erro){
                response.status(500).send(erro);
                return;
            }
            console.log("Pagamento Cancelado");
            response.status(204).send(pagamento);
        });
    });

    app.put("/pagamentos/pagamento/:id",function (request, response) {

        var pagamento = {};
        var id = request.params.id;
        
        pagamento.id = id;
        pagamento.status = PAGAMENTO_CONFIRMADO;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.atualiza(pagamento, function (erro) {
            if(erro){
                response.status(500).send(erro);
                return;
            }
            console.log("Pagamento Confirmado");
            response.send(pagamento);
        });
        
    });

    app.post("/pagamentos/pagamento", function (request, response) {

        request.assert("forma_de_pagamento","Forma de pagamento obrigatoria").notEmpty();
        request.assert("valor","Valor obrigatorio e deve ser decimal").notEmpty().isFloat();
        
        var errors = request.validationErrors();
        if(errors){
            console.log("Erros de Validacao Encontrados");
            response.status(400).send(errors);
            return;
        }

        var pagamento = request.body;
        console.log("Processando uma requisicao de um novo pagamento");

        pagamento.status = PAGAMENTO_CRIADO;
        pagamento.data   = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.salva(pagamento, function (erro, results) {
            if(erro){
                console.log("Erro ==> " + erro);
                response.status(400).send(erro);
            }else{
                pagamento.id = results.insertId;
                console.log("Pagamento Criado");
                response.location("pagamentos/pagamento/" + pagamento.id);
                //possiveis proximas etapas
                var resp = {
                    dados_do_pagamento: pagamento,
                    links: [
                        {
                            href:"http://localhost/3000/pagamentos/pagemnto/" + pagamento.id,
                            rel: "Confirmar",
                            method: "PUT"
                        },
                        {
                            href:"http://localhost/3000/pagamentos/pagemnto/" + pagamento.id,
                            rel: "Cancelar",
                            method: "DELETE"
                        }
                    ]
                }

                response.status(201).json(resp);    
            }
        });

        //response.send(pagamento);
    })
};