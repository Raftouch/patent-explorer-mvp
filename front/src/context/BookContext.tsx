import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type MyBookFinderContext = {
  loading: boolean;
  error: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const BookFinderContext = createContext<MyBookFinderContext>({
  loading: false,
  error: null,
  setLoading: () => {},
  setError: () => {},
});

interface BookFinderStateProps {
  children: React.ReactNode;
}

export const BookFinderState = ({ children }: BookFinderStateProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <BookFinderContext.Provider
      value={{ loading, error, setLoading, setError }}
    >
      {children}
    </BookFinderContext.Provider>
  );
};
