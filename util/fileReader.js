var fs = require("fs");//file system
var fileName = process.argv[2];

fs.readFile(fileName, function (err,buffer) {
    console.log("Arquivo Lido");

    fs.writeFile("imagem-nvo.jpg", buffer, function (err) {
        console.log("Arquivo Escrito");
    });
});