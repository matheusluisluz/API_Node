var mysql = require("mysql");

function createDBconnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "payfast",
        password: "12345678",
        database: "payfast"
    });
}

module.exports = function () {
    return createDBconnection;
}