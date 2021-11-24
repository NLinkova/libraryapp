// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let bookId = urlParameters.get("id")

// post back updated data
function deleteBook() {
    // // Get access to the create user form element
    // let deleteBookForm = document.getElementById("delete-book-form")
    // // Convert the user form fields into JSON. creates all strings and values
    // let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(deleteBookForm))); // stringify covnerts everyting to json string
    // console.log(formDataJSON)
    
    // Post form data to the API
    fetch("api/books/delete", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bookId: bookId})
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        // Redirect back to user list
        window.location.href = "book_list.html"
    })
}
