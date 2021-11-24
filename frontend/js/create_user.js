function postCreateUser() {
    // Get access to the create user form element
    let createUserForm = document.getElementById("create-user-form")
    // Convert the user form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm))); // stringify covnerts everyting to json string
    console.log(formDataJSON)
    
    // Post form data to the API
    fetch("/api/users/create",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            // Handle the response from the server
            console.log("Create user request sent!")
            alert(res)
            // Redirect back to user list
            window.location.href = "user_list.html"
        })
        .catch(err => {
            console.log('Create user request failed! ' + err)
        })        
}