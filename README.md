Admin panel Popular Books

### Entities

Author - Book - User - Log

### Buseness rules

- Form validation on all forms
- All forms input are sanitised prior to intertion into the
- Authentication checks on all privileged functions

### User interface

### Anonimous:

FORM PUT login

### Authenticated:

TABLE GET All books listing
FORM PUT Add new book
FORM PATCH Updating existing
BUTTON DELETE Deleting books interface
TABLE GET All authors listing
FORM PUT Add new authors form
FORM PATCH Updating authors page
BUTTON DELETE Deleting authors interface
FORM PUT Creating user accounts
FORM PATCH Update users
BUTTON DELETE Delete users

### API Endpoint

### Anonimous:

app.post('api/login')

### Authenticated:

app.put('api/addbook') 201
app.patch('api/updatebook')202
app.delete('api/deletebook') 202
app.get('api/allauthors') 200
app.put('api/addauthors') 201
app.patch('api/updateauthor') 202
app.delete('api/deleteauthors') 202
app.put('api/adduser') 201
app.patch('api/updateuser') 202
app.post(‘api/login’)

### SQL Schema

books - id
authors - id
users - id, username, password
log - id, method, url, uid, timestamp

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
