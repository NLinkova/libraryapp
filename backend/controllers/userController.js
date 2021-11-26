const express = require("express")
const bcrypt = require("bcrypt")
const validator = require("validator")

// create a router to define API routes in this file
const router = express.Router()
//Access the user model to access user data in this file
const userModel = require("../models/userModel")

// define a api/users endpoint that responds with an array of all users
router.get("/users", (req, res) => {
    if (req.session.user.accessRights !="admin") {
        // send back an error message
        res.status(403).json("admin only action")
        //stop the response handler here
        return
    }

    userModel.getAllUsers()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            //log any sql errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

 //Define an api/users/create endpoint that respondes with a specific user by id and create user 
router.post("/users/create", (req, res) => {
    //only admins use this endpoint
    if (req.session.user.accessRights !="admin") {
        // send back an error message
        res.status(403).json("admin only action")
        //stop the response handler here
        return
    }
    
    // req.body represents the form field data  (json of body of fetch)
    let user = req.body

    // Only allow valid emails
    if (validator.isEmail(user.email) == false) {
        res.status(300).json("invalid email")
        return
    }
  
    // hash the password before inserting into DB
    let hashedPassword = bcrypt.hashSync(user.password, 6) // какое-то блять время оценки пароля

    // each name references the 'name' attribute in the form
    userModel.createUser(
        validator.escape(user.firstName), // escape function sanitases fields
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword, // we now store the hashed password
        validator.escape(user.accessRights)
    )
    .then((result) => { // result это про результат запроса, не про количество даты
        res.status(200).json('user created with id ' + result.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('query error - failed to create user')
    })
})


// define api such acces reights and gets users rights
router.get("users/status" , (req, res) => {
    res.status(200).json(req.session.user.accessRights)
})

// request user by id
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
    .then((results) => {
        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(404).json("failed to get user by ID")
        }
    })
    .catch((error) => { // errors for front end
        console.log(error)
        res.status(500).json('failed to get user by ID - query error')
    })
})

// updating user data. define an api/users/update that updates an existing user
router.post("/users/update", (req,res)=>{
    // the req.body represents the posted json data
    let user = req.body;

    // If the password does not start with a $ then we need to hash it.
    let hahsedpassword = user.password;
    if(!user.password.startsWith("$2b$")){
        hahsedpassword = bcrypt.hashSync(user.password,6);
    }
    console.log(user);
    // Each of the names below reference the "name" attribute in the form
    userModel.updateUser(
        validator.escape(user.userId),
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hahsedpassword,   // Use the hashed passworrd
        validator.escape(user.accessRights)
    )
    .then((result)=>{
        if(result.affectedRows > 0){
            res.status(200).json("user updated");
        }else{
            res.status(404).json("user not found");
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json("failed to update user - query error");
    })
})


// delete user by id
router.post("/users/delete", (req,res)=>{
    // Access the user id from the body
    let userId = req.body.userId;

    // Ask the model to delete the user with userId
    userModel.deleteUser(userId)
        .then((result)=>{
            if(result.affectedRows >0){
                res.status(200).json("user deleted");
            }else{
                res.status(404).json("user not found");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to delete user - query error")
        })
})

//login function with username and password
router.post("/users/login", (req, res) => {
    let login = req.body

    userModel.getUserByUsername(login.username)
        .then((results) => {
            if (results.length > 0) {
                // We found a user with that username,
                // next we check their password.
                let user = results[0]

                // Check if the login password matches the users password hash
                if (bcrypt.compareSync(login.password, user.password)) {
                    // setup session information
                    req.session.user = {
                        userID: user.userID,
                        accessRights: user.accessRights,
                    }

                    // let the client know login was successful
                    res.status(200).json("login successful")
                } else {
                    // let teh client know login failed
                    res.status(401).json("login failed")
                }
            } else {
                // No user found with that username
                res.status(404).json("that user doesn't exist!")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get user - query error")
        })
})

// function to destroy session and logout
router.post("/users/logout", (req, res) => {
    // destroy the session
    req.session.destroy()
    res.status(200).json("logged out")
})

//this allows the server.js to import the routes defined in this file
module.exports = router