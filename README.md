Website with popular books, admin panel and 2 types of users. Developed using JS, Node and Express. Admin panel. Sessions and authorization.  Bootstrap layout. 

### Entities

Author - Book - User - Log

### Buseness rules

- Form validation on all forms
- All forms input to be sanitised prior to intertion into the
- Authentication checks on all privileged functions
- When adding/editing a book, one needs list og authors in picklist
- Update / delete needs to be an option in show authors and books

### User interface

### Anonimous:

- TABLE GET all books listing
- FORM PUT login

### Authenticated:

- TABLE GET All books listing
- FORM PUT Add new book
- FORM PATCH Updating existing
- BUTTON DELETE Deleting books interface
- TABLE GET All authors listing
- FORM PUT Add new authors form
- FORM PATCH Updating authors page
- BUTTON DELETE Deleting authors interface
- FORM PUT Creating user accounts
- FORM PATCH Update users
- BUTTON DELETE Delete users

### API Endpoint

### Anonimous:

app.post('api/login')

### Authenticated:

<br>app.put('api/addbook') 201
<br>app.patch('api/updatebook')202
<br>app.delete('api/deletebook') 202
<br>app.get('api/allauthors') 200
<br>app.put('api/addauthors') 201
<br>app.patch('api/updateauthor') 202
<br>app.delete('api/deleteauthors') 202
<br>app.put('api/adduser') 201
<br>app.patch('api/updateuser') 202
<br>app.post(‘api/login’)

### SQL Schema

books - id
<br>authors - id
<br>users - id, username, password
<br>log - id, method, url, uid, timestamp

### Startup instructions

Install NPM dependacies
Import database from sql/schema.sql database 'books'
Run node server

...
npm install
mysql2 -u root -p books < sql/schema.sql
node server.js
...

to start: open terminal and execute command 'npm start'
