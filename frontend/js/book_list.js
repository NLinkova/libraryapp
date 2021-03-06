//to load books list
fetch("api/books")
    .then(response => response.json())
    .then(books => {
        console.log(books)
         let book_list = document.getElementById("book-table")

        for (let book of books) { // ask data from json
            book_list.innerHTML +=` 
                <tr>
                    <td>${book.bookTitle}</td>
                    <td>${book.authorSurname}</td>
                    <td>${book.yearofPublication}</td>
                    <td>${book.genre}</td>
                    <td>${book.millionsSold}</td>
                    <td>${book.languageWritten}</td>
                    <td><img src="${book.coverImagePath}"></img></td>      
                    <td>${book.username}</td>
                    <td>${book.dateCreated}</td>
                    <td>${book.dateChanged}</td>            
                    <td><a href="update_book.html?id=${book.bookID}">Edit</a></td>
                    <td><a href="delete_book.html?id=${book.bookID}">Delete</a></td>
                </tr>
            `
        } 
    })

                         