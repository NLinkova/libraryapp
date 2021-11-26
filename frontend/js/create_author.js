//to send data to create author
function postCreateAuthor() {
    // Get access to the create user form element
    let createAuthorForm = document.getElementById("create-author-form")

    //client side validation on fields
    if (!createAuthorForm.name.checkValidity()) {
        createAuthorForm.name.focus();
        return;
    } else if (!createAuthorForm.surname.checkValidity()) {
        createAuthorForm.surname.focus();
        return;
    } else if (!createAuthorForm.nationality.checkValidity()) {
        createAuthorForm.nationality.focus();
        return;
    } else if (!createAuthorForm.birthYear.checkValidity()) {
        createAuthorForm.birthYear.focus();
        return;
    } else if (!createAuthorForm.deathYear.checkValidity()) {
        createAuthorForm.deathYear.focus();
        return;
    };

    // Convert the user form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthorForm))); // stringify covnerts everyting to json string
    console.log(formDataJSON)
    
    // Post form data to the API
    fetch("/api/authors/create",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            // Handle the response from the server
            console.log("Create author request sent!")
            alert(res)
            // Redirect back to user list
            window.location.href = "author_list.html"
        })
        .catch(err => {
            console.log('Create author request failed! ' + err)
        })        
}