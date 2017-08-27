var fs = require("fs");
var fileName = process.argv[2];

fs.createReadStream(fileName)
    .pipe(fs.createWriteStream("imagem-com-stream-novo.jpg")
    .on("finish", function () {
        console.log("Arquivo escrito com stream");
    }));