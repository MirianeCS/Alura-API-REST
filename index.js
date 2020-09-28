const customExpress = require('./config/custom-express');
const app = customExpress();

const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');
const tabelas = require('./infraestrutura/tabelas');

conexao.connect((erro) => {
    if(erro)
        console.log(erro);
    else
        console.log('Conectado com sucesso');

    tabelas.init(conexao);
    app.listen(3000, () => {
        console.log('Servidor na porta 3000');
});

});