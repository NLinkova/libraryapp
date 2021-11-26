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



function fetchHeader () {
    let header = document.getElementsByTagName("header")
    fetch('./header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML += data; 
    })
}
  
fetchHeader()