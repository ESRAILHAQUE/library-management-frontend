import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetBooksPaginatedQuery } from "../store/api/libraryApi";
import BookTable from "../components/books/BookTable";

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useGetBooksPaginatedQuery({ page, limit });
  const books = data?.items ?? [];

  const handleEdit = (book: any) => {
    navigate(`/edit-book/${book._id}`);
  };

  const handleBorrow = (book: any) => {
    navigate(`/borrow/${book._id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book List</h1>
          <p className="text-gray-600 mt-2">
            View and manage all books in the library.
          </p>
        </div>
        <Link
          to="/create-book"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
          <span>➕</span>
          <span>Add New Book</span>
        </Link>
      </div>

      <BookTable
        books={books}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onBorrow={handleBorrow}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Page {data?.page ?? 1} of {data?.pages ?? 1} • Total:{" "}
          {data?.total ?? 0}
        </div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={isLoading || (data?.page ?? 1) <= 1}>
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() =>
              setPage((p) => (data?.pages && p < data.pages ? p + 1 : p))
            }
            disabled={isLoading || !data || data.page >= (data.pages || 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
