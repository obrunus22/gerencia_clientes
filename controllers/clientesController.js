const ClienteModel = require('../models/clienteModel');
const ClienteView = require('../views/clienteView');

const ClientesController = {
    listarClientes: async (req, res) => {
        try {
            const clientes = req.query?.filtro ? await ClienteModel.filtraClientes(req.query.filtro) : await ClienteModel.listarClientes();
            ClienteView.listarClientes(res, clientes);
        } catch (error) {
            res.status(500).send('Erro no servidor');
        }
    },

    cadastrarCliente: async (req, res) => {
        try {
            const { nome, email, telefone, coordenadaX, coordenadaY } = req.body;
            const cliente = { nome, email, telefone, coordenadaX, coordenadaY };
            const insert = await ClienteModel.cadastrarCliente(cliente);

            if (insert) {
                ClienteView.cadastrarCliente(res, insert.rows);
            } else {
                console.error('Erro ao cadastrar cliente');
                res.status(500).send('Erro ao cadastrar o cliente.');
            }
        } catch (error) {
            res.status(500).send('Erro no servidor');
        }
    },

    calculaRotas: async (req, res) => {
        try {
            const clientes = await ClienteModel.calculaRotas();

            if (clientes.length > 0) {
                clientes.unshift({ coordenada_y: 0, coordenada_x: 0, id: -1 }); // Começa da empresa (0,0)
                const visitados = Array(clientes.length).fill(false);
                const ordemVisita = [0];

                for (let i = 0; i < clientes.length; i++) {
                    let indiceMaisProximo = -1;
                    let menorDistancia = Infinity;

                    for (let j = 0; j < clientes.length; j++) {
                        if (!visitados[j]) {
                            const cliente1 = clientes[ordemVisita[ordemVisita.length - 1]];
                            const deltaX = cliente1.coordenada_x - clientes[j].coordenada_x;
                            const deltaY = cliente1.coordenada_y - clientes[j].coordenada_y;
                            const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                            if (distancia < menorDistancia) {
                                menorDistancia = distancia;
                                indiceMaisProximo = j;
                            }
                        }
                    }

                    visitados[indiceMaisProximo] = true;
                    if (indiceMaisProximo > 0) {
                        ordemVisita.push(indiceMaisProximo);
                    }
                }

                const cliendId = [];

                for (let i = 1; i < ordemVisita.length; i++) {
                    cliendId.push(clientes[ordemVisita[i]].id);
                }

                ClienteView.exibeRotas(res, cliendId);
            } else {
                res.status(200).send('Não há clientes');
            }
        } catch (error) {
            res.status(500).send('Erro no servidor');
        }
    },
};

module.exports = ClientesController;