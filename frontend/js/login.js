// funstion to login for users
function postLoginUser() {
    // get access to the login user form
    let loginUserForm = document.getElementById("login-user-form")
    // convert the form fields into JSON 
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)))
    //post the form data to the backend
    fetch("/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        // Handle the response from the server
        console.log("user login request sent!")
        alert(res)
        // Redirect back to user list
        window.location.href = "book_list.html"
    })
    .catch(error => {
        console.log("user login failed - " + error)
    })
}