-- CREATE TABLE Authors (
--     AuthorID TEXT PRIMARY KEY,
--     Name TEXT NOT NULL
-- );

-- CREATE TABLE Genres (
--     GenreID TEXT PRIMARY KEY,
--     Name TEXT NOT NULL,
--     Description TEXT
-- );

-- CREATE TABLE Books (
--     BookID TEXT PRIMARY KEY,
--     Title TEXT NOT NULL,
--     AuthorID TEXT,
--     GenreID TEXT,
--     Pages INTEGER,
--     PublishedDate TEXT,
--     FOREIGN KEY (AuthorID) REFERENCES Authors (AuthorID) ON DELETE SET NULL,
--     FOREIGN KEY (GenreID) REFERENCES Genres (GenreID) ON DELETE SET NULL
-- );

-- INSERT INTO Books (BookID, Title, AuthorID, GenreID, Pages, PublishedDate) VALUES
-- ('b1a2c3d4-5678-9abc-def0-123456789001', 'Harry Potter and the Sorcerer''s Stone', '1a2b3c4d-5678-9abc-def0-123456789abc', 'g1', 309, '1997-06-26'),
-- ('b2a3c4d5-6789-abcd-ef01-234567890002', 'A Game of Thrones', '2b3c4d5e-6789-abcd-ef01-23456789abcd', 'g2', 694, '1996-08-06'),
-- ('b3a4c5d6-789a-bcde-f012-345678900003', 'The Shining', '3c4d5e6f-789a-bcde-f012-3456789abcde', 'g3', 447, '1977-01-28'),
-- ('b4a5c6d7-89ab-cdef-0123-456789000004', 'Murder on the Orient Express', '4d5e6f7g-89ab-cdef-0123-456789abcdef', 'g4', 256, '1934-01-01'),
-- ('b5a6c7d8-9abc-def0-1234-567890000005', 'The Da Vinci Code', '5e6f7g8h-9abc-def0-1234-56789abcdef0', 'g5', 489, '2003-03-18'),
-- ('b6a7c8d9-0abc-def1-2345-678900000006', 'Pride and Prejudice', '6f7g8h9i-0abc-def1-2345-6789abcdef12', 'g6', 279, '1813-01-28'),
-- ('b7a8c9d0-1bcd-ef23-4567-890000000007', 'Adventures of Huckleberry Finn', '7g8h9i0j-1bcd-ef23-4567-89abcdef1234', 'g7', 366, '1884-12-10'),
-- ('b8a9c0d1-2cde-f345-6789-000000000008', 'The Hobbit', '8h9i0j1k-2cde-f345-6789-abcdef123456', 'g8', 310, '1937-09-21'),
-- ('b9a0c1d2-3def-4567-89ab-000000000009', 'The Old Man and the Sea', '9i0j1k2l-3def-4567-89ab-cdef12345678', 'g9', 127, '1952-09-01'),
-- ('b0a1c2d3-4ef0-5678-9abc-000000000010', 'A Tale of Two Cities', '0j1k2l3m-4ef0-5678-9abc-def123456789', 'g1', 341, '1859-01-01'),
-- ('b1c2d3e4-5f01-6789-abcd-000000000011', 'War and Peace', '1k2l3m4n-5f01-6789-abcd-ef123456789a', 'g2', 1225, '1869-01-01'),
-- ('b2c3d4e5-6f12-789a-bcde-000000000012', 'The Great Gatsby', '2l3m4n5o-6f12-789a-bcde-f123456789ab', 'g3', 180, '1925-04-10'),
-- ('b3c4d5e6-7f23-89ab-cdef-000000000013', 'To Kill a Mockingbird', '3m4n5o6p-7f23-89ab-cdef-0123456789ab', 'g4', 281, '1960-07-11'),
-- ('b4c5d6e7-8f34-9abc-def0-000000000014', 'The Chronicles of Narnia', '4n5o6p7q-8f34-9abc-def0-123456789abc', 'g5', 767, '1950-10-16'),
-- ('b5c6d7e8-9f45-0bcd-ef12-000000000015', 'Mrs. Dalloway', '5o6p7q8r-9f45-0bcd-ef12-3456789abcdef', 'g6', 194, '1925-05-14'),
-- ('b6d7e8f9-0f56-1cde-f234-000000000016', 'The Picture of Dorian Gray', '6p7q8r9s-0f56-1cde-f234-56789abcdef0', 'g7', 254, '1890-07-20'),
-- ('b7d8e9f0-1f67-2def-3456-000000000017', 'One Hundred Years of Solitude', '7q8r9s0t-1f67-2def-3456-789abcdef123', 'g8', 417, '1967-06-05'),
-- ('b8d9e0f1-2f78-3bcd-4567-000000000018', 'The Metamorphosis', '8r9s0t1u-2f78-3bcd-4567-89abcdef1234', 'g9', 201, '1915-10-15'),
-- ('b9e0f1g2-3f89-4cde-5678-000000000019', '1984', '9s0t1u2v-3f89-4cde-5678-9abcdef12345', 'g1', 328, '1949-06-08'),
-- ('b0e1f2g3-4f90-5def-6789-000000000020', 'David Copperfield', '0j1k2l3m-4ef0-5678-9abc-def123456789', 'g2', 882, '1850-01-01');



select * from authors;
select * from Genres;
select * from books;

-- select * from Authors;