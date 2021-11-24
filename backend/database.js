// Import mysql2 module to talk to the database
const mysql = require("mysql2")

// Create a connection to the database
const connection = mysql.createPool({ // not just CreateConnection, createpool gives many connection 
    host: "localhost",
    user: 'root',
    password: 'root', // if database has a password
    database: 'popularbooks' // name of the schema
})

// this wrapper will allow the use of promise functions 
// like .then() and .catch() so that we can use it in an async way along with express.JS

// function query
query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error) // если какая то ошибка
            } else {
                resolve(results) // eсли успешно и приходяь результаты
            }    
        })
    })
}

// export the new query function so that the models can use it
module.exports = { query }