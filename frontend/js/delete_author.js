// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let authorId = urlParameters.get("id")

// post back updated data
function deleteAuthor() {
        
    // Check that a user ID was specified
    if (authorId) {
        // Post form data to the API
        fetch("api/authors/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({authorId: authorId})
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            // Redirect back to user list
            window.location.href = "author_list.html"
        })
    }
}
