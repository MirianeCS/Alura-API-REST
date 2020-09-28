const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'admin1007',
    database: 'agenda'
});

module.exports = conexao;

//sudo mysql -hlocalhost -uroot -pxxx