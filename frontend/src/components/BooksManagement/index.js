import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table, Button, Form, Modal, Container } from "react-bootstrap";
import "./index.css";

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    BookID: "",
    title: "",
    author: "",
    genre: "",
    pages: "",
    publishedDate: "",
  });
  const [editMode, setEditMode] = useState(false);

  const apiURL = "https://prudent-books-management.onrender.com/books";

  const fetchBooks = async () => {
    try {
      const response = await axios.get(apiURL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleShow = (book = null) => {
    if (book) {
      setBookDetails({
        BookID: book.BookID,
        title: book.Title,
        author: book.Author,
        genre: book.Genre,
        pages: book.Pages,
        publishedDate: book.PublishedDate,
      });
      setEditMode(true);
    } else {
      setBookDetails({
        BookID: "",
        title: "",
        author: "",
        genre: "",
        pages: "",
        publishedDate: "",
      });
      setEditMode(false);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${apiURL}/${bookDetails.BookID}`, bookDetails);
      } else {
        await axios.post(apiURL, bookDetails);
      }
      fetchBooks();
      handleClose();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">Books Management</h1>

      <Button variant="primary" onClick={() => handleShow()}>
        Add Book
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Pages</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.BookID}>
                <td>{book.Title}</td>
                <td>{book.Author}</td>
                <td>{book.Genre}</td>
                <td>{book.Pages}</td>
                <td>{book.PublishedDate}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(book.BookID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Books Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={bookDetails.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={bookDetails.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={bookDetails.genre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type="number"
                name="pages"
                value={bookDetails.pages}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Published Date</Form.Label>
              <Form.Control
                type="date"
                name="publishedDate"
                value={bookDetails.publishedDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Update Book" : "Add Book"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BooksManagement;



