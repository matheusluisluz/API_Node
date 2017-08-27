var fs = require("fs");

module.exports = function (app) {
    
    app.post("/upload/imagem", function (request, response) {
        console.log("Recebendo Imagem");

        var fileName = request.headers.filename;

        request.pipe(fs.createWriteStream("files/" + fileName))
            .on("finish", function () {
                console.log("Arquivo Escrito");
                response.status(201).send("OK");
            })
        
    });


}