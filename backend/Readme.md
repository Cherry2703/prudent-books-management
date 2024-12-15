### Books Management Backend
This project is a simple backend API for managing books, authors, and genres. It provides various endpoints for adding, updating, fetching, and deleting books from a SQLite database.

### Table of Contents
Tech Stack
Installation

### API Endpoints
GET /
GET /books
POST /books
PUT /books/:id
DELETE /books/:id


## Database Schema
Error Handling
Tech Stack
Express.js: Web framework for Node.js to build RESTful APIs.
SQLite: Database engine for storing book, author, and genre data.
UUID: To generate unique IDs for books, authors, and genres.
Node.js: JavaScript runtime used for building the backend.
Installation
Clone the repository:

git clone <repository-url>
Navigate to the project directory:


cd books-management-backend
Install the dependencies:


npm install
Create the database file (if not already created):

The SQLite database file is automatically created when the server starts.
Start the server:

npm start
The server will run on port 3004 by default, or the port specified in the environment variable PORT.



### API Endpoints
# 1. GET /
Description: Returns a message indicating the API is working.
Method: GET
Response:

{
  "message": "Books Management Backend is Working go for different routes"
}

# 2. GET /books
Description: Fetches all the books along with their authors and genres.
Method: GET
Response:

[
  {
    "BookID": "uuid",
    "Title": "Book Title",
    "Author": "Author Name",
    "Genre": "Genre Name",
    "Pages": 300,
    "PublishedDate": "2022-01-01"
  }
]


# 3. POST /books
Description: Adds a new book. If the author or genre does not exist, they are created.
Method: POST
Request Body:

{
  "Title": "New Book Title",
  "AuthorName": "Author Name",
  "Genre": "Genre Name",
  "Pages": 350,
  "PublishedDate": "2022-01-01"
}
Response:

{
  "message": "Book added successfully!",
  "BookID": "uuid"
}



#  4. PUT /books/:id
Description: Updates an existing book's information (Title, Author, Genre, Pages, and PublishedDate).
Method: PUT
Request Body:

{
  "Title": "Updated Book Title",
  "AuthorName": "Updated Author Name",
  "Genre": "Updated Genre Name",
  "Pages": 400,
  "PublishedDate": "2023-01-01"
}
Response:

{
  "message": "Book updated successfully."
}


# 5. DELETE /books/:id
Description: Deletes a book by its BookID.
Method: DELETE
Response:
{
  "message": "Book deleted successfully."
}


## Database Schema
## The application uses a SQLite database with the following tables:

# 1. Books
BookID (Primary Key)
Title
AuthorID (Foreign Key referencing Authors table)
GenreID (Foreign Key referencing Genres table)
Pages
PublishedDate
# 2. Authors
AuthorID (Primary Key)
Name
# 3. Genres
GenreID (Primary Key)
Name
Description



# Error Handling
The API handles errors with appropriate HTTP status codes and error messages.

400 Bad Request: Missing required fields or invalid data.
404 Not Found: Requested book, author, or genre does not exist.
500 Internal Server Error: Unexpected errors on the server.
Example Error Responses
400 Bad Request:

{
  "error": "All fields are required."
}
404 Not Found:


{
  "error": "Book not found."
}
500 Internal Server Error:


{
  "error": "Internal server error",
  "details": "Error details here"
}
