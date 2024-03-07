const ClienteView = {
    listarClientes: (res, clientes) => {
        res.json(clientes);
    },

    cadastrarCliente: (res, cliente) => {
        res.json(cliente);
    },

    exibeRotas: (res, rotas) => {
        res.json(rotas);
    }
};

module.exports = ClienteView;
