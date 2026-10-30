
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Temporary storage for books
let books = [];
let nextId = 1;

// Home page
app.get("/", (req, res) => {
    res.send(`
        <h1>Book Reading Tracker - Version 3</h1>

        <h2>Add a New Book</h2>

        <form action="/add" method="POST">
            <input type="text" name="bookName"
                   placeholder="Enter book name" required>
            <button type="submit">Add Book</button>
        </form>

        <h2>Update Reading Status</h2>

        <form action="/update" method="POST">
            <select name="bookId" required>
                ${books.map(book =>
                    `<option value="${book.id}">${book.name}</option>`
                ).join("")}
            </select>

            <select name="status" required>
                <option value="Not Started">Not Started</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
            </select>

            <button type="submit">Update Status</button>
        </form>

        <h2>View All Books</h2>
        <a href="/books">Click Here to View Book List</a>
    `);
});

// Add book
app.post("/add", (req, res) => {
    books.push({
        id: nextId++,
        name: req.body.bookName,
        status: "Not Started"
    });

    res.redirect("/");
});

// Update reading status
app.post("/update", (req, res) => {
    const book = books.find(
        book => book.id === Number(req.body.bookId)
    );

    if (book) {
        book.status = req.body.status;
    }

    res.redirect("/");
});

// View all books
app.get("/books", (req, res) => {
    res.send(`
        <h1>All Books - Version 3</h1>

        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Reading Status</th>
            </tr>

            ${books.map(book => `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.status}</td>
                </tr>
            `).join("")}
        </table>

        <br>
        <a href="/">Back to Home</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Book Reading Tracker v3 running at http://localhost:3000");
});
