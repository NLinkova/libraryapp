//fetch to oploadied data
fetch("api/users")
    .then(response => response.json())
    .then(users => {
        console.log(users)
         let userList = document.getElementById("user-table")

        for (let user of users) { // ask data from json
            userList.innerHTML +=`                 
                <tr>
                    <th scope="row">${user.userID}</th>
                    <td>${user.username}</td>
                    <td>${user.firstName}</td>
                    <td><a href="update_user.html?id=${user.userID}">Edit</a></td>
                    <td><a href="delete_user.html?id=${user.userID}">Delete</a></td> 
                </tr>                
            `
        } 
    })