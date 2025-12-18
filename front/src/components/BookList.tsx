import { useContext, useEffect, useState } from "react";
import type { Book, BookData } from "../types/book";
import { apiUrl } from "../utils/api";
import BookCard from "./BookCard";
import { BookFinderContext } from "../context/BookContext";

interface BookListProps {
  query: string;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function BookList({
  query,
  page,
  limit,
  onPageChange,
}: BookListProps) {
  const [bookData, setBookData] = useState<BookData>();
  const [books, setBooks] = useState<Book[]>([]);

  const { loading, error, setLoading, setError } =
    useContext(BookFinderContext);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${apiUrl}?q=${query}&page=${page}&limit=${limit}`
        );

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

    getBooks();
  }, [query, page, limit]);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Book List</h1>
      <p className="text-gray-600 mb-6">Total Results: {bookData?.total}</p>

      {loading && (
        <p className="text-blue-600 font-medium mb-4">Loading... Please wait</p>
      )}

      {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

      {books.length > 0 && (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-8">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">Page {page}</span>

        <button
          onClick={() => onPageChange(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {!loading && books.length === 0 && (
        <p className="text-gray-500">No results found</p>
      )}
    </section>
  );
}
