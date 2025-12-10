const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ debug: true });
const port = process.env.PORT;
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/api/books", async (req, res) => {
  try {
    const query = req.query.q;
    console.log("query : ", query);

    if (!query) {
      return res.status(400).send("Missing query parameter");
    }

    const url = `https://openlibrary.org/search.json?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    const result = {
      total: data.num_found,
      books: data.docs.map((book) => ({
        title: book.title,
        author: book.author_name,
        year: book.first_publish_year,
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null,
      })),
    };
    // book.cover_edition_key

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occured while fetching books");
  }
});

const start = async () => {
  try {
    app.listen(port, () => console.log(`App is running on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
