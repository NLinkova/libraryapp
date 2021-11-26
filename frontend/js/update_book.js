// loading existing data
let urlParameters = new URLSearchParams(window.location.search) //this represents ?id=2

// access the user id from the query string (id=2)
let bookId = urlParameters.get("id")

if (bookId) {
    fetch(`api/books/${bookId}`) 
        .then(res => res.json())
        .then(book => {
            console.log(book)
            document.getElementById("bookId").value = book.bookID
            document.getElementById("bookTitle").value = book.bookTitle
            document.getElementById("originalTitle").value = book.originalTitle
            document.getElementById("author").value = book.authorID
            document.getElementById("year").value = book.yearofPublication
            document.getElementById("genre").value = book.genre
            document.getElementById("millionsSold").value = book.millionsSold
            document.getElementById("language").value = book.languageWritten
            document.getElementById("cover-image").value = book.coverImagePath
            
        })
}

function postUpdateBook() {
    // Get access to the create user form element
    let updateBookForm = document.getElementById("update-book-form")

    //client side validation on fields
    if (!updateBookForm.bookTitle.checkValidity()) {
        updateBookForm.bookTitle.focus();
        return;
    } else if (!updateBookForm.originalTitle.checkValidity()) {
        updateBookForm.originalTitle.focus();
        return;
    } else if (!updateBookForm.yearofPublication.checkValidity()) {
        updateBookForm.yearofPublication.focus();
        return;
    } else if (!updateBookForm.genre.checkValidity()) {
        updateBookForm.genre.focus();
        return;
    } else if (!updateBookForm.millionsSold.checkValidity()) {
        updateBookForm.millionsSold.focus();
        return;
    } else if (!updateBookForm.languageWritten.checkValidity()) {
        createBookForm.languageWritten.focus();
        return;
    } else if (!updateBookForm.authorID.checkValidity()) {
        updateBookForm.authorID.focus();
        return;
    };

    // Convert the book form fields into JSON. creates all strings and values
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateBookForm))); // stringify covnerts everyting to json string
    console.log(formDataJSON)
    
    // Post form data to the API
    fetch("/api/books/update",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            console.log('book request sent!')
            alert(res)
            // Redirect back to user list
            window.location.href = "book_list.html"
        })
        .catch(err => {
            console.log('Create book request failed! ' + error)
        })        
}

// Create a table of existing book covers and do the same thing.
fetch("/api/authors")
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