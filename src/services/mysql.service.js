const mysql = require('mysql2/promise');

const mysqlConfig = require('../configs/mysql.config')



let connect;

async function createConnet() {
    console.log('>> start connet mysql at', mysqlConfig.host)
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

    if (values) {
        for (let index = 0; index < values.length; index++) {
            if (values[index] === undefined) values[index] = null
        }
    }

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