const express = require("express")
const validator = require("validator")
// Create a router so that we can define API
// routes in this file.
const router = express.Router()
// Access the author model so that we can access
// book data in this file.
const authorModel = require("../models/authorModel")

// define a api/authors endpoint that responds with an array of all authors
router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

//Define an api/authors/:id endpoint that respondes with a specific author by id
router.get("/authors/:id", (req, res) => { 
    authorModel.getAuthorById(req.params.id)
     .then((results) => {
         if (results.length > 0) {
             res.status(200).json(results[0])
         } else {
             res.status(404).json("failed to find the author by ID")
         }
     })
     .catch((error) => {
         console.log(error)
         res.status(500).json('query error')
     })
 })
 
 // creating author req 
 //Define an api/authors/creste endpoint that respondes with a specific author by id and create author 
 router.post("/authors/create", (req, res) => {
     // req.body represents the form field data  (json of body of fetch)
     let author = req.body;
 
     // each name references the 'name' attribute in the form
     authorModel.createAuthor(
        validator.escape(author.name),
        validator.escape(author.surname),
        validator.escape(author.nationality),
        validator.escape(author.birthYear),
        validator.escape(author.deathYear)
     ) 
 
     .then((results) => { // result это про результат запроса, не про количество даты
         res.status(200).json('author created with id ' + results.insertId)
         console.log(results)        
 
     })
     .catch((error) => {
         console.log(error)
         res.status(500).json('query error - failed to create author')
     })
 })
 
 
 // updating authors data. define an api/authors/update that updates an existing author
 router.post("/authors/update", (req, res) => {
     // the req.body represents the posted json data 
     let author = req.body;
 
     //each of the name below represent the 'name' attribute in the form
     authorModel.updateAuthor(
        validator.escape(author.authorID),
        validator.escape(author.name),
        validator.escape(author.surname),
        validator.escape(author.nationality),
        validator.escape(author.birthYear),
        validator.escape(author.deathYear)
     )
 
     .then((results) => {
         if (results.affectedRows > 0) {
             res.status(200).json("author updated")
         } else {
             res.status(404).json("author not found")
         }
     })
     .catch((error) => { // errors for front end
         console.log(error)
         res.status(500).json('failed to update author by ID - query error')
     })
 })
 
 
 // delete author by id
 router.post("/authors/delete", (req, res) => {
     // Access the author id from the body of the request
     let authorId = req.body.authorId
 
     // Ask the model to delete the author with bookId
     authorModel.deleteAuthor(authorId)
         .then((results) => {
             if (results.affectedRows > 0) {
                 res.status(200).json("author deleted")
             } else {
                 res.status(404).json("author not found")
             }
         })
         .catch((error) => {
             console.log(error)
             res.status(500).json("failed to delete author - query error")
         })
 })

// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router