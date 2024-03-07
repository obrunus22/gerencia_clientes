require('dotenv').config();
const express = require('express');
var cors = require('cors');
const app = express();
const db = require('./db');
const port = 1337;

app.use(express.json());
app.use(cors());

// Rotas
const clientesRouter = require('./routes/clientesRoutes');
app.use('/clientes', clientesRouter);

(async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        coordenada_x FLOAT NOT NULL,
        coordenada_y FLOAT NOT NULL,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await db.query(query);
    } catch (error) {
        console.error(error.message);
    }
})();

const baseDir = `${__dirname}/frontend/build/`;
app.use(express.static(`${baseDir}`));
app.use('*', (req, res) => res.sendFile('index.html', { root: baseDir }));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});