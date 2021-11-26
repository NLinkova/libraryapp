//to send data to create book
function postCreateBook() {  
    // Get access to the create user form element
    let createBookForm = document.getElementById("create-book-form")

    //client side validation on fields
    if (!createBookForm.bookTitle.checkValidity()) {
        createBookForm.bookTitle.focus();
        return;
    } else if (!createBookForm.originalTitle.checkValidity()) {
        createBookForm.originalTitle.focus();
        return;
    } else if (!createBookForm.yearofPublication.checkValidity()) {
        createBookForm.yearofPublication.focus();
        return;
    } else if (!createBookForm.genre.checkValidity()) {
        createBookForm.genre.focus();
        return;
    } else if (!createBookForm.millionsSold.checkValidity()) {
        createBookForm.millionsSold.focus();
        return;
    } else if (!createBookForm.languageWritten.checkValidity()) {
        createBookForm.languageWritten.focus();
        return;
    } else if (!createBookForm.authorID.checkValidity()) {
        createBookForm.authorID.focus();
        return;
    };

    // Convert the user form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createBookForm))); // stringify covnerts everyting to json string
    console.log(formDataJSON)
    
    // Post form data to the API
    fetch("/api/books/create",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        //turn data into json format
        .then(res => res.json())
        .then(res => {
            console.log('book request sent!')
            alert(res)
            // Redirect back to user list
            window.location.href = "book_list.html"
        })
        .catch(err => {
            console.log('Create book request failed! ' + err)
        })        
}

// Create a list of existing authors
fetch("/api/authors")
//turn list into json format
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("author")
        for (let author of authors) {
            authorSelect.innerHTML 
            += `<option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }
})

// Create a list of existing book covers and do the same thing.
fetch("/api/books")
    .then(res => res.json())
    .then((books) => {
        let bookSelect = document.getElementById("cover-image")
        for (let book of books) {
            bookSelect.innerHTML 
            += `<option value="${book.coverImagePath}">
                    ${book.coverImagePath}
                </option>`
        }
})