const Pool = require('pg').Pool
const pool = new Pool ({
    host: 'dev.opensource-technology.com',
    user: 'postgres',
    password: 'QS4d4UWfsZDyGTup',
    database: 'dev-test',
    port: '2345'
})

module.exports = pool