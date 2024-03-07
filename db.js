const { Pool } = require('pg');

const pool = new Pool({
    user: 'nnowhecb',
    host: 'kesavan.db.elephantsql.com',
    database: 'nnowhecb',
    password: 'fUdM7PWovz0TcnRQZNxxMlZZ1K9MoOc5',
    port: 5432,
});

module.exports = pool;