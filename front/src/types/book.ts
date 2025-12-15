export type BookData = {
  total: number;
  books: Book[];
};

export type Book = {
  title: string;
  author: string[];
  year: number;
  // cover: string | null;
  coverId: number | null;
};
