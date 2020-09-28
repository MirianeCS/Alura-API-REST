const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento{
    adiciona(atendimento, resp){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        //VALIDACAO
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                mensagem: 'Data maior que data atual',
                valido: dataValida
            },
            {
                nome: 'cliente',
                mensagem: 'Nome invalido',
                valido: clienteValido
            }
        ];

        const erros = validacoes.filter((campo) => {
            return !campo.valido;
        });
        const existemErros = erros.length;

        if(existemErros)
            resp.status(400).json(erros);
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};
    
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro)
                    resp.status(400).json(erro);
                else
                    resp.status(201).json(atendimento);
            });
        }

    }

    lista(resp){
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro)
                resp.status(400).json(erro);
            else
                resp.status(200).json(resultados);
        });
    };

    buscaPorId(id, resp){

        // console.log('Oi');
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];

            if(erro)
                resp.status(400).json(erro);
            else
                resp.status(200).json(atendimento);
        });
    };

    altera(id, valores, resp){
        if(valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro)
                resp.status(400).json(erro);
            else
                resp.status(200).json({...valores, id});
        });
    };

    deleta(id, resp) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro)
                resp.status(400).json(erro);
            else
                resp.status(200).json({id});
        });
    };
}

module.exports = new Atendimento;