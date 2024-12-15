const express = require('express')
const app = express()
const port = process.env.PORT || 3004
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbpath = path.join(__dirname,'./database.db')

const { v4: uuidv4 } = require("uuid"); 

let db;


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








app.post('/books', async (req, res) => {
  const { Title, AuthorName, Genre, Pages, PublishedDate } = req.body;

  if (!Title || !AuthorName || !Genre || !Pages || !PublishedDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    let AuthorID, GenreID;

    // Step 1: Check or Add Author
    const checkAuthorSQL = `SELECT AuthorID FROM Authors WHERE Name = ?`;
    const insertAuthorSQL = `INSERT INTO Authors (AuthorID, Name) VALUES (?, ?)`;

    const authorRow = await new Promise((resolve, reject) => {
      db.get(checkAuthorSQL, [AuthorName], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (authorRow) {
      AuthorID = authorRow.AuthorID;
    } else {
      AuthorID = uuidv4(); // Generate new AuthorID
      await new Promise((resolve, reject) => {
        db.run(insertAuthorSQL, [AuthorID, AuthorName], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Step 2: Check or Add Genre
    const checkGenreSQL = `SELECT GenreID FROM Genres WHERE Name = ?`;
    const insertGenreSQL = `INSERT INTO Genres (GenreID, Name, Description) VALUES (?, ?, ?)`;

    const genreRow = await new Promise((resolve, reject) => {
      db.get(checkGenreSQL, [Genre], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (genreRow) {
      GenreID = genreRow.GenreID;
    } else {
      GenreID = uuidv4(); // Generate new GenreID
      const GenreDescription = `Description for ${Genre}`;
      await new Promise((resolve, reject) => {
        db.run(insertGenreSQL, [GenreID, Genre, GenreDescription], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Step 3: Insert Book Record
    const BookID = uuidv4();
    const insertBookSQL = `
      INSERT INTO Books (BookID, Title, AuthorID, GenreID, Pages, PublishedDate)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
      db.run(
        insertBookSQL,
        [BookID, Title, AuthorID, GenreID, Pages, PublishedDate],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.status(201).json({ message: 'Book added successfully!', BookID });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});








app.put('/books/:id', async (req, res) => {
    const { id } = req.params; 
    const { Title, AuthorName, Genre, Pages, PublishedDate } = req.body;
  
    if (!Title || !AuthorName || !Genre || !Pages || !PublishedDate) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      let AuthorID, GenreID;
      const checkAuthorSQL = `SELECT AuthorID FROM Authors WHERE Name = ?`;
      const insertAuthorSQL = `INSERT INTO Authors (AuthorID, Name) VALUES (?, ?)`;
  
      const authorRow = await new Promise((resolve, reject) => {
        db.get(checkAuthorSQL, [AuthorName], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (authorRow) {
        AuthorID = authorRow.AuthorID;
      } else {
        AuthorID = uuidv4(); 
        await new Promise((resolve, reject) => {
          db.run(insertAuthorSQL, [AuthorID, AuthorName], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    const checkGenreSQL = `SELECT GenreID FROM Genres WHERE Name = ?`;
      const insertGenreSQL = `INSERT INTO Genres (GenreID, Name, Description) VALUES (?, ?, ?)`;
  
      const genreRow = await new Promise((resolve, reject) => {
        db.get(checkGenreSQL, [Genre], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (genreRow) {
        GenreID = genreRow.GenreID;
      } else {
        GenreID = uuidv4(); 
        const GenreDescription = `Description for ${Genre}`;
        await new Promise((resolve, reject) => {
          db.run(insertGenreSQL, [GenreID, Genre, GenreDescription], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
        const updateBookSQL = `
        UPDATE Books
        SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
        WHERE BookID = ?
      `;
  
      const result = await new Promise((resolve, reject) => {
        db.run(
          updateBookSQL,
          [Title, AuthorID, GenreID, Pages, PublishedDate, id],
          function (err) {
            if (err) reject(err);
            else resolve(this.changes);
          }
        );
      });
  
      if (result > 0) {
        res.status(200).json({ message: 'Book updated successfully.' });
      } else {
        res.status(404).json({ error: 'Book not found or no changes made.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  


  app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const checkBookSQL = `SELECT * FROM Books WHERE BookID = ?`;
      const book = await new Promise((resolve, reject) => {
        db.get(checkBookSQL, [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
      }
        const deleteBookSQL = `DELETE FROM Books WHERE BookID = ?`;
      const result = await new Promise((resolve, reject) => {
        db.run(deleteBookSQL, [id], function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        });
      });
  
      if (result > 0) {
        res.status(200).json({ message: 'Book deleted successfully.' });
      } else {
        res.status(400).json({ error: 'Failed to delete the book.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
  