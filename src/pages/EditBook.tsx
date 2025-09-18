import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../store/api/libraryApi";
import BookForm from "../components/books/BookForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook, error } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const handleSubmit = async (bookData: any) => {
    try {
      await updateBook({ id: id!, updates: bookData }).unwrap();
      toast.success("Book updated successfully");
      navigate("/books");
    } catch (error: any) {
      const msg =
        error?.data?.error || error?.data?.message || "Failed to update book";
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    navigate("/books");
  };

  if (isLoadingBook) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Loading book details..." />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-red-800">Book not found</h3>
        <p className="mt-2 text-sm text-red-700">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/books")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
        <p className="text-gray-600 mt-2">
          Update the information for "{book.title}".
        </p>
      </div>

      <BookForm
        initialData={book}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
        title="Edit Book"
      />
    </div>
  );
};

export default EditBook;
