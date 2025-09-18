import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockBooks } from "../../data/mockBooks";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface Borrow {
  _id?: string;
  bookId: string;
  quantity: number;
  dueDate: string;
}

// Create the API slice
export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // Your backend URL
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    // Book endpoints
    getBooks: builder.query<Book[], void>({
      queryFn: () => {
        // Return mock data directly without making HTTP request
        return { data: mockBooks };
      },
      providesTags: ["Book"],
    }),
    getBook: builder.query<Book, string>({
      queryFn: (id) => {
        const book = mockBooks.find((book) => book._id === id);
        if (!book) {
          return { error: { status: 404, data: "Book not found" } };
        }
        return { data: book };
      },
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      queryFn: (newBook) => {
        // Generate new ID and create book
        const book: Book = {
          _id: Date.now().toString(),
          title: newBook.title || "",
          author: newBook.author || "",
          genre: newBook.genre || "",
          isbn: newBook.isbn || "",
          description: newBook.description || "",
          copies: newBook.copies || 1,
          available: newBook.available !== undefined ? newBook.available : true,
        };

        // Add to mock data
        mockBooks.push(book);

        return { data: book };
      },
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, { id: string; updates: Partial<Book> }>({
      queryFn: ({ id, updates }) => {
        // Find and update book in mock data
        const bookIndex = mockBooks.findIndex((book) => book._id === id);
        if (bookIndex === -1) {
          return { error: { status: 404, data: "Book not found" } };
        }

        // Update the book
        mockBooks[bookIndex] = { ...mockBooks[bookIndex], ...updates };

        return { data: mockBooks[bookIndex] };
      },
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      queryFn: (id) => {
        // Find and remove book from mock data
        const bookIndex = mockBooks.findIndex((book) => book._id === id);
        if (bookIndex === -1) {
          return { error: { status: 404, data: "Book not found" } };
        }

        // Remove the book
        mockBooks.splice(bookIndex, 1);

        return { data: undefined };
      },
      invalidatesTags: ["Book"],
    }),
    // Borrow endpoints
    borrowBook: builder.mutation<
      Borrow,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: (borrowData) => ({
        url: "borrows",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query<any[], void>({
      query: () => "borrows/summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = libraryApi;
