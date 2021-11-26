// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let userId = urlParameters.get("id")

if (userId) {
    fetch(`api/users/${userId}`) 
        .then(res => res.json())
        .then(user => {
            console.log(user)
            document.getElementById("userId").value = user.userID
            document.getElementById("firstName").value = user.firstName
            document.getElementById("lastName").value = user.lastName
            document.getElementById("email").value = user.email
            document.getElementById("username").value = user.username
            document.getElementById("password").value = user.password
            document.getElementById("accessRights").value = user.accessRights
        })
}


// post back updated data

function postUpdateUser() {
    // Get access to the create user form element
    let updateUserForm = document.getElementById("update-user-form")

        //client side validation on fields
        if (!updateUserForm.firstName.checkValidity()) {
            updateUserForm.firstName.focus();
            return;
        } else if (!updateUserForm.lastName.checkValidity()) {
            updateUserForm.lastName.focus();
            return;
        } else if (!updateUserForm.email.checkValidity()) {
            updateUserForm.email.focus();
            return;
        } else if (!updateUserForm.username.checkValidity()) {
            updateUserForm.username.focus();
            return;
        } else if (!updateUserForm.password.checkValidity()) {
            updateUserForm.password.focus();
            return;
        } else if (!updateUserForm.accessRights.checkValidity()) {
            updateUserForm.accessRights.focus();
            return;
        };

    // Convert the user form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm))); // stringify covnerts everyting to json string
    
    // Post form data to the API
    fetch("/api/users/update",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            console.log('user updated!')
            alert(res)
            //redirect back to user list
            window.location.href = "user_list.html"
        })
        .catch(err => {
            console.log('Update user request failed! ' + error)
        })
}