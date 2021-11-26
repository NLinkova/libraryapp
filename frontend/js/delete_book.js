// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let bookId = urlParameters.get("id")

// post back updated data
function deleteBook() {
    // Check that a user ID was specified
    if (bookId) {
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
}