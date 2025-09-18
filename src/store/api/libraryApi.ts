import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface BorrowRecord {
  _id: string;
  book: { _id: string; title: string; author: string; isbn: string } | string;
  borrowerName: string;
  borrowerEmail: string;
  quantity: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string | null;
  status: "active" | "returned" | "overdue";
  fine?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  count: number;
}

// Create the API slice
export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      (import.meta as any).env?.VITE_API_URL ||
      (process as any).env?.REACT_APP_API_URL ||
      "http://localhost:5000/api",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    // Book endpoints
    getBooks: builder.query<
      Book[],
      {
        page?: number;
        limit?: number;
        search?: string;
        genre?: string;
        available?: boolean;
      } | void
    >({
      query: (args) => {
        const params: Record<string, any> = {};
        if (args && typeof args === "object") {
          if (args.page) params.page = args.page;
          if (args.limit) params.limit = args.limit;
          if (args.search) params.search = args.search;
          if (args.genre) params.genre = args.genre;
          if (typeof args.available === "boolean")
            params.available = args.available;
        }
        return { url: "books", method: "GET", params } as const;
      },
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response as Book[];
        if (response?.data && Array.isArray(response.data))
          return response.data as Book[];
        if (response?.data?.data && Array.isArray(response.data.data))
          return response.data.data as Book[];
        return [] as Book[];
      },
      providesTags: ["Book"],
    }),

    getBooksPaginated: builder.query<
      PaginatedResult<Book>,
      {
        page?: number;
        limit?: number;
        search?: string;
        genre?: string;
        available?: boolean;
      }
    >({
      query: ({ page = 1, limit = 10, search, genre, available }) => ({
        url: "books",
        method: "GET",
        params: { page, limit, search, genre, available },
      }),
      transformResponse: (response: any) => {
        if (response?.data && Array.isArray(response.data)) {
          return {
            items: response.data as Book[],
            total: Number(response.total) || (response.data as Book[]).length,
            page: Number(response.page) || 1,
            pages: Number(response.pages) || 1,
            count: Number(response.count) || (response.data as Book[]).length,
          } as PaginatedResult<Book>;
        }
        // Fallback if backend returns array only
        const arr = Array.isArray(response) ? (response as Book[]) : [];
        return {
          items: arr,
          total: arr.length,
          page: 1,
          pages: 1,
          count: arr.length,
        };
      },
      providesTags: ["Book"],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => ({ url: `books/${id}`, method: "GET" }),
      transformResponse: (response: any) => {
        if (response?.data) return response.data as Book;
        return response as Book;
      },
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      transformResponse: (response: any) => {
        if (response?.data) return response.data as Book;
        return response as Book;
      },
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, { id: string; updates: Partial<Book> }>({
      query: ({ id, updates }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: updates,
      }),
      transformResponse: (response: any) => {
        if (response?.data) return response.data as Book;
        return response as Book;
      },
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({ url: `books/${id}`, method: "DELETE" }),
      transformResponse: () => undefined,
      invalidatesTags: ["Book"],
    }),

    // Borrow endpoints
    borrowBook: builder.mutation<
      Borrow,
      {
        bookId: string;
        quantity: number;
        dueDate: string;
        borrowerName: string;
        borrowerEmail: string;
      }
    >({
      query: (borrowData) => ({
        url: "borrows",
        method: "POST",
        body: borrowData,
      }),
      transformResponse: (response: any) => {
        if (response?.data) return response.data as Borrow;
        return response as Borrow;
      },
      invalidatesTags: ["Book", "Borrow"],
    }),

    getBorrowsPaginated: builder.query<
      PaginatedResult<BorrowRecord>,
      { page?: number; limit?: number; status?: string; borrowerEmail?: string }
    >({
      query: ({ page = 1, limit = 10, status, borrowerEmail }) => ({
        url: "borrows",
        method: "GET",
        params: { page, limit, status, borrowerEmail },
      }),
      transformResponse: (response: any) => {
        const data = response?.data || [];
        return {
          items: Array.isArray(data) ? (data as BorrowRecord[]) : [],
          total:
            Number(response?.total) || (Array.isArray(data) ? data.length : 0),
          page: Number(response?.page) || 1,
          pages: Number(response?.pages) || 1,
          count:
            Number(response?.count) || (Array.isArray(data) ? data.length : 0),
        } as PaginatedResult<BorrowRecord>;
      },
      providesTags: ["Borrow"],
    }),

    getBorrowSummary: builder.query<any[], void>({
      query: () => ({ url: "borrows/summary", method: "GET" }),
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response as any[];
        if (response?.data && Array.isArray(response.data))
          return response.data as any[];
        return [] as any[];
      },
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksPaginatedQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowsPaginatedQuery,
  useGetBorrowSummaryQuery,
} = libraryApi;
