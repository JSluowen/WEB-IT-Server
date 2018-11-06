const config = require("./config");
const mysql = require("mysql");

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err,connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql,values,(err,data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                    connection.release() // 结束回话
                })
            }

        })
    })
}
module.exports = query