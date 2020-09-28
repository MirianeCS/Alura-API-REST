const Atendimento = require('../models/atendimentos');

module.exports = (app) => {
    
    app.get('/atendimentos', (req, resp) => {
        Atendimento.lista(resp);
    });

    app.post('/atendimentos', (req, resp) => {
        // console.log(req.body);
        const atendimento = req.body;

        Atendimento.adiciona(atendimento, resp);;
    });
    
    app.get('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        
        Atendimento.buscaPorId(id, resp);
        // resp.send('Tudo certo');
    });

    app.patch('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores, resp);
    });

    app.delete('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);

        Atendimento.deleta(id, resp);
    });
};