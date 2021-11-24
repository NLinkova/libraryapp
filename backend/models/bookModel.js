// access the database connection from database.js
const db = require("../database") // export from the database

module.exports.getAllBooks = () => {
  return db.query(`SELECT 
    b.bookID, 
    b.bookTitle,
    b.originalTitle,
    b.yearofPublication,
    b.genre,
    b.millionsSold,
    b.languageWritten,
    b.coverImagePath,
    b.authorID,
    a.surname as authorSurname, 
    a.name as authorName,
    u.username,
    u.firstName,
    u.lastName,
    u.userID,
    c.dateCreated,
    c.dateChanged
  FROM 
    book b 
    INNER JOIN author a ON b.authorID = a.authorID
    LEFT JOIN changelog c ON b.bookID = c.bookID
    LEFT JOIN users u ON u.userID = c.userID
  ORDER BY b.bookTitle, b.bookID`)
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
