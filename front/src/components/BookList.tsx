import { useEffect, useState } from "react";
import type { Book, BookData } from "../types/book";
import { apiUrl } from "../utils/api";
import BookCard from "./BookCard";

interface BookListProps {
  query: string;
}

export default function BookList({ query }: BookListProps) {
  const [bookData, setBookData] = useState<BookData>();
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    try {
      const res = await fetch(`${apiUrl}?q=${query}`);

      if (!res.ok) throw new Error("Failed to fetch books");

      const data: BookData = await res.json();

      setBookData(data);
      setBooks(books);
    } catch (error) {
      console.log(error);
      setBooks([]);
    }
  };

  useEffect(() => {
    getBooks();
  }, [query]);

  return (
    <div>
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
