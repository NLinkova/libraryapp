const express = require("express")
const session = require("express-session")
const server = express()
const port = 8080

// enable middleware for JSON and urlencoded form data
server.use(express.json())
server.use(express.urlencoded({ 
    extended: true 
})) 

// enable session middleware so that we have state
server.use(session({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

//access control middleware
server.use((req, res, next) => {
    // The user is logged in if they hae session data
    let userLoggedIn = req.session.user != null

    // define a list of allowed ULs for non-logged in users
    let allowedURLs = [
        "/login.html",
        "/js/login.js",
        "/css/styles.css",
        "/api/users/login",
        "/header.html",
        "/js/header.js",
        
    ]

    // define a list of ULs for admin only
    let adminOnlyUrls = [
        "/create_user.html",
        "/js/create_user.js",
        "/update_user.html",
        "/js/update_user.js",
        "/user_list.html",
        "/js/user_list.js",        
    ]

    // if the user is logged in
    if (userLoggedIn) {
        // if it is admin
        if (req.session.user.accessRights == 'admin' || !adminOnlyUrls.includes(req.originalUrl)) {
            //let admin through
            next() //next middleware, or step in the pipeline
        } else {
            //if it is user go to book_list
            res.redirect("./book_list.html")
        }
    } else {
        // Else (they are not logged in)
        // Check if the url they want is allowed
        if (allowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next()
        } else {
            // if not allowed - redirect to the login page
            res.redirect("/login.html")
        }
    }
})

// serve static frontend resources. should be after session and before controllers
server.use(express.static("frontend"))

// link up book controller
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

// Link up the user controller
const userController = require("./backend/controllers/userController")
server.use("/api/", userController)

// Link up the author controller
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

// start the express server
server.listen(port, () => {
    console.log("Backend listening on http://localhost:"+port)
})