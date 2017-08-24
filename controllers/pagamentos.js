module.exports = function(app){
    app.get("/pagamentos",function(request,response){
        console.log("Recebida requisicao de teste na porta 3000");
        response.send("OK");
    })
};