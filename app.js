
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Temporary storage for books
let books = [];
let nextId = 1;
app.get("/", (req, res) => {
    res.send(`
        <h1>Book Reading Tracker - Version 2</h1>

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

        <h2>Current Books and Status</h2>
        <ul>
            ${books.map(book =>
                `<li>${book.name} - ${book.status}</li>`
            ).join("")}
        </ul>
    `);
});
app.post("/add", (req, res) => {
    books.push({
        id: nextId++,
        name: req.body.bookName,
        status: "Not Started"
    });

    res.redirect("/");
});
app.post("/update", (req, res) => {
    const book = books.find(
        book => book.id === Number(req.body.bookId)
    );

    if (book) {
        book.status = req.body.status;
    }
    res.redirect("/");
});
app.listen(3000, () => {
    console.log("Book Reading Tracker v2 running at http://localhost:3000");
});
