import { Book } from "../store/api/libraryApi";

export const mockBooks: Book[] = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    isbn: "978-0-7432-7356-5",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    copies: 5,
    available: true,
  },
  {
    _id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    isbn: "978-0-06-112008-4",
    description:
      "A gripping tale of racial injustice and childhood innocence in the American South.",
    copies: 3,
    available: true,
  },
  {
    _id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    isbn: "978-0-452-28423-4",
    description:
      "A dystopian social science fiction novel about totalitarian control and surveillance.",
    copies: 0,
    available: false,
  },
  {
    _id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    isbn: "978-0-14-143951-8",
    description:
      "A romantic novel of manners that critiques the British landed gentry.",
    copies: 2,
    available: true,
  },
  {
    _id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    isbn: "978-0-316-76948-0",
    description:
      "A coming-of-age story about teenage rebellion and alienation.",
    copies: 1,
    available: true,
  },
  {
    _id: "6",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    isbn: "978-0-547-92822-7",
    description:
      "An epic high-fantasy novel about the quest to destroy the One Ring.",
    copies: 4,
    available: true,
  },
  {
    _id: "7",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    isbn: "978-0-439-35548-4",
    description:
      "The first book in the Harry Potter series about a young wizard's journey.",
    copies: 0,
    available: false,
  },
  {
    _id: "8",
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    genre: "Fantasy",
    isbn: "978-0-06-440537-9",
    description:
      "A series of fantasy novels about children who discover the magical world of Narnia.",
    copies: 3,
    available: true,
  },
];
