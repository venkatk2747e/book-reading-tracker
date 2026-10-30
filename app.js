
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
let books = [];

app.get("/", (req, res) => {
    res.send(`
        <h1>Book Reading Tracker - Version 1</h1>

        <h2>Add a New Book</h2>

        <form action="/add" method="POST">
            <input type="text" name="bookName"
                   placeholder="Enter book name" required>
            <button type="submit">Add Book</button>
        </form>
    `);
});

// Add book feature
app.post("/add", (req, res) => {
    const bookName = req.body.bookName;

    books.push(bookName);

    res.send(`
        <h1>Book Added Successfully!</h1>
        <p>Book Name: ${bookName}</p>
        <a href="/">Add Another Book</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Book Reading Tracker v1 running at http://localhost:3000");
});
