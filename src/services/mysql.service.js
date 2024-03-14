const mysql = require('mysql2/promise');

const mysqlConfig = require('../configs/mysql.config')



let connect;

async function createConnet() {
    connect = await mysql.createConnection(mysqlConfig);
}

createConnet()


/**
 * 
 * @param {string} sql 
 * @param {[...string]} values 
 * @returns {[Error | null, mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | null, mysql.FieldPacket[] | null]}
 */
async function query(sql, values) {
    try {
        const [result, fields] = await connect.execute(sql, values);
        return [null, result, fields];
    }
    catch (err) {
        return [err, [], []]
    }
}


module.exports = {
    "query": query, 
    "escape": mysql.escape
}