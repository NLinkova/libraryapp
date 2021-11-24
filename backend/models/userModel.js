// access the database connection from database.js
const db = require("../database") // export from the database

module.exports.getAllUsers = () => {
    return db.query("SELECT userID, firstName, lastName, email, username, accessRights FROM users")
               
}
 
module.exports.createUser = (firstName, lastName, email, username, password, accessRights) => {
    return db.query("INSERT INTO users (firstName, lastName, email, username, password, accessRights) "
        + "VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, username, password, accessRights]) // the same quantity of ? and colums
}

module.exports.getUserById = (id) => { // id parameter should match in the function. мб userId, any
    return db.query("SELECT * FROM users WHERE userID = ?", [id]) // ? просто знак для извличение данных из базы
}

module.exports.getUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = ?", [username])
}

module.exports.updateUser = (userId, firstName, lastName, email, username, password, accessRights) =>{
    return db.query("UPDATE users SET firstName = ?, lastName = ?, email = ?, username = ?,"
   +"password = ?, accessRights = ? WHERE userId = ?", [firstName, lastName, email, username, password, accessRights, userId]);
}

module.exports.deleteUser = (userId) => {
   return db.query("DELETE FROM users WHERE userId = ?", [userId]);
}  
