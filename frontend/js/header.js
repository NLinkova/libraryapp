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

// function disabledUserList() {
//     let link = document.getElementById('user-list_link');
//     if(req.session.user.accessRights !="admin") {
//         link.style.display = "none";
//     } else {
//         link.style.display = "block";
//     }
// }

function fetchHeader () {
    let header = document.getElementsByTagName("header")
    fetch('./header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML += data; 
    })
}
  
fetchHeader()
// disabledUserList()

const inputElement = document.getElementsByTagName("input")