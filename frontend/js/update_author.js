// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let authorId = urlParameters.get("id")

if (authorId) {
    fetch(`api/authors/${authorId}`) 
        .then(res => res.json())
        .then(author => {
            console.log(author)
            document.getElementById("authorId").value = author.authorID
            document.getElementById("name").value = author.name
            document.getElementById("surname").value = author.surname
            document.getElementById("nationality").value = author.nationality
            document.getElementById("birthYear").value = author.birthYear
            document.getElementById("deathYear").value = author.deathYear
        })
}


// post back updated data

function postUpdateAuthor() {
    // Get access to the create user form element
    let updateAuthorForm = document.getElementById("update-author-form")

    //client side validation on fields
    if (!updateAuthorForm.name.checkValidity()) {
        updateAuthorForm.name.focus();
        return;
    } else if (!updateAuthorForm.surname.checkValidity()) {
        updateAuthorForm.surname.focus();
        return;
    } else if (!updateAuthorForm.nationality.checkValidity()) {
        updateAuthorForm.nationality.focus();
        return;
    } else if (!updateAuthorForm.birthYear.checkValidity()) {
        updateAuthorForm.birthYear.focus();
        return;
    } else if (!updateAuthorForm.deathYear.checkValidity()) {
        updateAuthorForm.deathYear.focus();
        return;
    };


    // Convert the user form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateAuthorForm))); // stringify covnerts everyting to json string
    
    // Post form data to the API
    fetch("/api/authors/update",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            console.log('author updated!')
            alert(res)
            //redirect back to user list
            window.location.href = "author_list.html"
        })
        .catch(err => {
            console.log('Update author request failed! ' + error)
        })
}