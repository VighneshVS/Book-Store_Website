import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import cors from "cors";

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(cors());

//To post a new Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(404).send("Required data not sent");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//To get all the books in the databas
app.get("/books", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.search;

  const skip = (page - 1) * limit;
  try {
    const query = search?.length
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const totalCountPrm = Book.find(query).countDocuments();
    const booksPrm = Book.find(query).sort({ _id: 1 }).limit(limit).skip(skip);

    const [totalCount, books] = await Promise.all([totalCountPrm, booksPrm]);

    res.status(200).json({
      totalCount,
      dataList: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//To get one book by id from the database
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//To update an already existing book by id
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(404)
        .json({
          message: "Enter the required fields : Title, author, publish year",
        });
    }

    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    console.log(book);

    if (!book) {
      return res
        .status(404)
        .json({ message: `The book with id : ${id} is not found` });
    }
    return res.status(200).json({ message: "Book updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

//To delete a book by id
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findByIdAndDelete(id);

    if (!books) {
      return res.status(404).json({ message: "The book was not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.mongoDB)
  .then(() => {
    console.log("App is connected to the database");
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((error) => console.log(error));
