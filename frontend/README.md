### Books Management System
This is a React-based Books Management System that allows you to manage a collection of books, including adding, editing, and deleting books. It interacts with a backend API to fetch, create, update, and delete book records. The UI is built using React and styled with React Bootstrap.

### Features

# Add a New Book: Users can add new books to the system.
# Edit Book Details: Users can edit the details of an existing book.
# Delete Book: Users can delete a book from the system.
# View Books: The list of books is displayed in a table format, and it shows information such as Title, Author, Genre, Pages, and Published Date.


## Technologies Used
React: For building the user interface.
React Bootstrap: For styling the components.
Axios: For making API requests to fetch, update, and delete books from the backend.
React Hooks: For managing state and lifecycle methods (useState, useEffect).
React Modal: For showing pop-up modals for adding and editing books.


## Installation
To run this project locally, follow the steps below:

Prerequisites
Make sure you have the following installed:

Node.js: You can download it from here.
npm: Comes with Node.js.




### API Integration
This project uses a backend API for books management, hosted at:

# API URL: https://prudent-books-management.onrender.com/books
## API Endpoints
GET /books: Fetches the list of all books.
POST /books: Adds a new book to the system.
PUT /books/:id: Updates an existing book.
DELETE /books/:id: Deletes a book from the system.