// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let userId = urlParameters.get("id")

// post back updated data
function deleteUser() {
        
    // Check that a user ID was specified
    if (userId) {
        // Post form data to the API
        fetch("api/users/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId: userId})
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            // Redirect back to user list
            window.location.href = "user_list.html"
        })
    }
}
