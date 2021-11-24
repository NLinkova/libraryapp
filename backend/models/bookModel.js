// access the database connection from database.js
const db = require("../database") // export from the database

module.exports.getAllBooks = () => {
   return db.query("SELECT * FROM popularbooks.book INNER JOIN author ON book.authorID = popularbooks.author.authorID")
}

module.exports.getBookById = (id) => {     
  return db.query("SELECT * FROM book WHERE bookID = ?", [id])
}

module.exports.createBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
  return db.query("INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) "
    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID]) // the same quantity of ? and colums
}

module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID)  => {
  return db.query("UPDATE book SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ?, authorID = ? WHERE bookID = ?", 
  [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID, bookID]) // разные способы написание фуркции, в зависимости от запроса  UPDATE, insert..     
}

module.exports.deleteBook = (id) => {
  return db.query("DELETE FROM book WHERE bookID = ?", [id]) 
}   
