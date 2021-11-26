// log out function
function postLogoutUser() {
    fetch("/api/users/logout", {
        method: "POST"
    })
    .then(res => res.json())
    .then(res => {
        // Handle the response from the server
        console.log("user logout request sent!")
        alert(res)
        // Redirect back to user list
        window.location.href = "login.html"
    })
    .catch(error => {
        console.log("user logout failed - " + error)
    })
}