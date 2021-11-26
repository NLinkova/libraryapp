// Access the database connection from database.js
const db = require("../database")

module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author")
}

module.exports.getAuthorById = (id) => {     
    return db.query("SELECT * FROM author WHERE authorID = ?", [id])
  }
  
  module.exports.createAuthor= (name, surname, nationality, birthYear, deathYear) => {
    return db.query("INSERT INTO author (name, surname, nationality, birthYear, deathYear) "
      + "VALUES (?, ?, ?, ?, ?)", [name, surname, nationality, birthYear, deathYear]) // the same quantity of ? and colums
  }
  
  module.exports.updateAuthor = (authorID, name, surname, nationality, birthYear, deathYear)  => {
    return db.query("UPDATE author SET name = ?, surname = ?, nationality = ?, birthYear = ?, deathYear = ? WHERE authorID = ?", 
    [name, surname, nationality, birthYear, deathYear, authorID]) // разные способы написание фуркции, в зависимости от запроса  UPDATE, insert..     
  }
  
  module.exports.deleteAuthor = (id) => {
    return db.query("DELETE FROM author WHERE authorID = ?", [id]) 
  }   
  