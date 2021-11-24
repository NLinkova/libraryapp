// access the database connection from database.js
const db = require("../database") // export from the database

module.exports.addLogEntryBook = (bookID, userID) => {
    return db.query("INSERT INTO changelog (bookID, userID, dateCreated) " + "VALUES (?, ?, CURDATE())", [bookID, userID])

}

module.exports.updateLogEntryBook = (bookID) => {
    return db.query("UPDATE changelog SET dateChanged=CURDATE() WHERE bookID=?", [bookID]);
    
}