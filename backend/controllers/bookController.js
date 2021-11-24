const express = require("express")
const validator = require("validator")
// create a router to define API routes in this file
const router = express.Router()
//Access the books model to access book data in this file
const bookModel = require("../models/bookModel")

const logModel = require("../models/logModel")

// define a api/books endpoint that responds with an array of all books
router.get("/books", (req, res) => {        
    bookModel.getAllBooks()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            //log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

//Define an api/books/:id endpoint that respondes with a specific book by id
router.get("/books/:id", (req, res) => { 
   bookModel.getBookById(req.params.id)
    .then((results) => {
        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(404).json("failed to find the book by ID")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('query error')
    })
})

// creating user req

router.post("/books/create", (req, res) => {
    // req.body represents the form field data  (json of body of fetch)
    let book = req.body;
    // let user = req.session.user;

    // each name references the 'name' attribute in the form
    bookModel.createBook(
        book.bookTitle,
        book.originalTitle,
        book.yearofPublication,
        book.genre,
        book.millionsSold,
        book.languageWritten,
        book.coverImagePath,
        book.authorID
    ) 

    .then((results) => { // result это про результат запроса, не про количество даты
        res.status(200).json('book created with id ' + results.insertId)
        console.log(results)        
        logModel.addLogEntryBook(results.insertId, user.userID)

    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('query error - failed to create book')
    })
})


// updating user data. define an api/users/update that updates an existing user
router.post("/books/update", (req, res) => {
    // the req.body represents the posted json data 
    let book = req.body;
    let user = req.session.user;

    //each of the name below represent the 'name' attribute in the form
    bookModel.updateBook(
        book.bookID,
        book.bookTitle,
        book.originalTitle,
        book.yearofPublication,
        book.genre,
        book.millionsSold,
        book.languageWritten,
        book.coverImagePath,
        book.authorID
    )

    .then((results) => {
        if (results.affectedRows > 0) {
            res.status(200).json("book updated")
            logModel.updateLogEntryBook(book.bookID, user.userID)
            // logModel.addLogEntryBook(results.insertId, user.userID)
        } else {
            res.status(404).json("book not found")
        }
    })
    .catch((error) => { // errors for front end
        console.log(error)
        res.status(500).json('failed to update book by ID - query error')
    })
})


// delete book by id
router.post("/books/delete", (req, res) => {
    // Access the book id from the body of the request
    let bookId = req.body.bookId

    // Ask the model to delete the book with bookId
    bookModel.deleteBook(bookId)
        .then((results) => {
            if (results.affectedRows > 0) {
                res.status(200).json("book deleted")
            } else {
                res.status(404).json("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete book - query error")
        })
})
module.exports = router