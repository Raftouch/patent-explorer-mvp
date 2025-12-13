import { useContext, useEffect, useState } from "react";
import type { Book, BookData } from "../types/book";
import { apiUrl } from "../utils/api";
import BookCard from "./BookCard";
import { BookFinderContext } from "../context/BookContext";

interface BookListProps {
  query: string;
}

export default function BookList({ query }: BookListProps) {
  const [bookData, setBookData] = useState<BookData>();
  const [books, setBooks] = useState<Book[]>([]);

  const { loading, error, setLoading, setError } =
    useContext(BookFinderContext);

  const getBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}?q=${query}`);

      if (!res.ok) throw new Error("Failed to fetch books");

      const data: BookData = await res.json();

      setBookData(data);
      setBooks(data.books);
    } catch (error) {
      console.error(error);
      setBooks([]);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, [query, setLoading, setError]);

  return (
    <div>
      {loading && <p>Loading... Please wait</p>}
      {error && <p>{error}</p>}

      <h1>Book List</h1>
      <p>Total Results: {bookData?.total}</p>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
