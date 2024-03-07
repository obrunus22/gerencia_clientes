const db = require('../db');

const ClienteModel = {
    listarClientes: async (clienteId = false) => {
        try {
            let query = 'SELECT * FROM clientes ';
            const params = [];

            if (clienteId) {
                query = 'WHERE id = $1';
                params.push(clienteId);
            } else {
                query += 'ORDER BY data_cadastro DESC'
            }

            const result = await db.query(query, params);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    cadastrarCliente: async (cliente) => {
        try {
            const { nome, email, telefone, coordenadaX, coordenadaY } = cliente;
            const query = 'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y, data_cadastro) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *';
            const result = await db.query(query, [nome, email, telefone, coordenadaX, coordenadaY]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    filtraClientes: async (filtro) => {
        try {
            const query = `SELECT * FROM clientes WHERE LOWER(nome) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($2) OR telefone LIKE $3 ORDER BY data_cadastro DESC`;
            const result = await db.query(query, [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    calculaRotas: async () => {
        try {
            const query = `SELECT * FROM clientes`;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

module.exports = ClienteModel;
