import { useState } from "react";
import BookList from "./components/BookList";

function App() {
  const [page, setPage] = useState(1);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <BookList
        query="достоевский"
        page={page}
        limit={20}
        onPageChange={setPage}
      />
    </main>
  );
}

export default App;
