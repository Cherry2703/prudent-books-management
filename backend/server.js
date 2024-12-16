const express = require('express')
const app = express()
const port = process.env.PORT || 3004
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')

const dbpath = path.join(__dirname,'./database.db')

const { v4: uuidv4 } = require("uuid"); 

let db;

app.use(express.json())
app.use(cors())


const initializeDBAndServer = async() =>{
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        })
        app.listen(port,()=>{
            console.log('server has started');
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}



initializeDBAndServer()



app.get('/',async(request,response)=>{
    response.status(200).send('Books Management Backend is Working go for different routes')
})
 




app.get("/books", async (req, res) => {
    try {
        const query = `
            SELECT 
                Books.BookID, 
                Books.Title, 
                Authors.Name AS Author, 
                Genres.Name AS Genre, 
                Books.Pages, 
                Books.PublishedDate
            FROM Books
            LEFT JOIN Authors ON Books.AuthorID = Authors.AuthorID
            LEFT JOIN Genres ON Books.GenreID = Genres.GenreID;
        `;

        const books = await db.all(query); // Execute query to fetch all rows
        res.status(200).json(books); // Send books as JSON response
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.post('/books/', async (request, response) => {
    try {
      const { title, author, genre, pages, publishedDate } = request.body;
        if (!title || !author || !genre || !pages || !publishedDate) {
        return response.status(400).send({ error: 'Missing required fields: title, author, genre, pages, or publishedDate.' });
      }
  
      let authorQuery = `SELECT AuthorID FROM Authors WHERE name = ?`;
      let authorResult = await db.get(authorQuery, [author]);
      let AuthorID;
  
      if (!authorResult) {
        AuthorID = uuidv4();
        const insertAuthor = `INSERT INTO Authors (AuthorID, name) VALUES (?, ?);`;
        await db.run(insertAuthor, [AuthorID, author]);
      } else {
        AuthorID = authorResult.AuthorID;
      }
  
      let genreQuery = `SELECT GenreID FROM Genres WHERE name = ?`;
      let genreResult = await db.get(genreQuery, [genre]);
      let GenreID;
  
      if (!genreResult) {
        GenreID = uuidv4();
        const insertGenre = `INSERT INTO Genres (GenreID, name, description) VALUES (?, ?, ?);`;
        await db.run(insertGenre, [GenreID, genre, '']);
      } else {
        GenreID = genreResult.GenreID;
      }
  
      const BookID = uuidv4();
      const insertBook = `INSERT INTO Books (BookID, Title, AuthorID, GenreID, Pages, PublishedDate)
                          VALUES (?, ?, ?, ?, ?, ?);`;
      await db.run(insertBook, [BookID, title, AuthorID, GenreID, pages, publishedDate]);
  
      response.status(200).send({ message: 'Book added successfully!', BookID });
    } catch (error) {
      console.error('Error adding book:', error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  });




  app.put('/books/:id', async (request, response) => {
    try {
      const { id } = request.params; 
      const { title, author, genre, pages, publishedDate } = request.body;
  
      const getBookQuery = `SELECT * FROM Books WHERE BookID = ?;`;
      const book = await db.get(getBookQuery, [id]);
  
      if (!book) {
        return response.status(404).send({ error: 'Book not found' });
      }
  
      const updatedTitle = title || book.Title;
      const updatedPages = pages || book.Pages;
      const updatedPublishedDate = publishedDate || book.PublishedDate;
  
      let updatedAuthorID = book.AuthorID;
      if (author) {
        const authorQuery = `SELECT AuthorID FROM Authors WHERE name = ?;`;
        const authorResult = await db.get(authorQuery, [author]);
        if (!authorResult) {
          updatedAuthorID = uuidv4();
          const insertAuthor = `INSERT INTO Authors (AuthorID, name) VALUES (?, ?);`;
          await db.run(insertAuthor, [updatedAuthorID, author]);
        } else {
          updatedAuthorID = authorResult.AuthorID;
        }
      }
  
      let updatedGenreID = book.GenreID;
      if (genre) {
        const genreQuery = `SELECT GenreID FROM Genres WHERE name = ?;`;
        const genreResult = await db.get(genreQuery, [genre]);
        if (!genreResult) {
          updatedGenreID = uuidv4();
          const insertGenre = `INSERT INTO Genres (GenreID, name, description) VALUES (?, ?, ?);`;
          await db.run(insertGenre, [updatedGenreID, genre, '']);
        } else {
          updatedGenreID = genreResult.GenreID;
        }
      }
  
      const updateBookQuery = `
        UPDATE Books
        SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
        WHERE BookID = ?;
      `;
      await db.run(updateBookQuery, [
        updatedTitle,
        updatedAuthorID,
        updatedGenreID,
        updatedPages,
        updatedPublishedDate,
        id,
      ]);
  
      response.status(200).send({ message: 'Book updated successfully!' });
    } catch (error) {
      console.error('Error updating book:', error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  });
  




  app.delete('/books/:id', async (request, response) => {
    try {
      const { id } = request.params; 
  
      const getBookQuery = `SELECT * FROM Books WHERE BookID = ?;`;
      const book = await db.get(getBookQuery, [id]);
  
      if (!book) {
        return response.status(404).send({ error: 'Book not found' });
      }
  
      const deleteBookQuery = `DELETE FROM Books WHERE BookID = ?;`;
      await db.run(deleteBookQuery, [id]);
  
      response.status(200).send({ message: 'Book deleted successfully!' });
    } catch (error) {
      console.error('Error deleting book:', error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  });
  