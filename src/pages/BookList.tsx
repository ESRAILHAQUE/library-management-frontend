import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../store/api/libraryApi";
import BookTable from "../components/books/BookTable";

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading, error } = useGetBooksQuery();

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
    </div>
  );
};

export default BookList;
