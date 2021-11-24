function postCreateBook() {
    // Get access to the create user form element
    let createBookForm = document.getElementById("create-book-form")
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

// fetch("/api/books")
//     .then(res => res.json())
//     .then((books) => {
//         let bookSelect = document.getElementById("cover-image")

//         for (let book of books) {
//             bookSelect.innerHTML 
//             += `<option value="${book.coverImagePath}">
//                     ${book.coverImagePath}
//                 </option>`
//         }
// })