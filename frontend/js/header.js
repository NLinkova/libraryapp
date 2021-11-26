// logout function under menu
function postLogoutUser() {
    fetch("/api/users/logout", {
            method: "POST"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.href = "login.html"
        })
        .catch(error => {
            console.log("logout failed" + error)
        })
}
 
//function to check access roght and define menus
fetch("api/users/status")
    .then(response => response.json())
    .then(rights => {
        if (rights = 'admin') {
            fetch('./header_admin.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header').innerHTML += data;
                })
        } else {
            fetch('./header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header').innerHTML += data;
                })

        }
    })

