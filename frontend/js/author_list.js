fetch("api/authors")
    .then(response => response.json())
    .then(books => {
        console.log(authors)
         let author_list = document.getElementById("author-table")

        for (let author of authors) { // ask data from json
            author_list.innerHTML +=` 
                <tr>
                    <td>${author.name}</td>
                    <td>${author.surname}</td>
                    <td>${author.nationality}</td>
                    <td>${author.birthYear}</td>
                    <td>${author.deathYear}</td>         
                    <td><a href="update_author.html?id=${author.authorID}">Edit</a></td>
                    <td><a href="delete_author.html?id=${author.authorID}">Delete</a></td>
                </tr>
            `
        } 
    })

                         