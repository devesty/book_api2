// const express = require('express');
// const bodyParser = require('body-parser');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Book = require('./models/book'); // Import the Book model

const app = express();
const PORT = 10000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://esther:AprilDeveloper1998@cluster0.7mgqjgc.mongodb.net/book-api2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define a schema for books
const bookSchema = new mongoose.Schema({
  name: String,
  author: String
});


// Create a model using the schema
const Book = mongoose.model('Book', bookSchema);


// Route to create a new book
app.post('/api/postbooks', async (req, res) => {
  const { name, author } = req.body;
  if (!name || !author) {
    return res.status(400).json({ error: 'name and author are required' });
  }

  try {
    const newBook = await Book.create({ name, author });
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating book' });
  }
});

// Route to get all books
app.get('/api/getbooks', async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving books' });
  }
});

// Route to delete a particular book
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(deletedBook);
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting book' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
