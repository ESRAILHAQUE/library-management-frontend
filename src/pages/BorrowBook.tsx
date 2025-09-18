import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBorrowBookMutation,
  useGetBookQuery,
} from "../store/api/libraryApi";
import LoadingSpinner from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const BorrowBook: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading: isLoadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [form, setForm] = useState({
    borrowerName: "",
    borrowerEmail: "",
    quantity: 1,
    dueDate: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number" ? Math.max(1, parseInt(value || "1", 10)) : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.borrowerName.trim()) return setError("Borrower name is required");
    if (!form.borrowerEmail.trim())
      return setError("Borrower email is required");
    if (!form.dueDate) return setError("Due date is required");

    try {
      await borrowBook({
        bookId: bookId!,
        borrowerName: form.borrowerName,
        borrowerEmail: form.borrowerEmail,
        quantity: form.quantity,
        dueDate: form.dueDate,
      }).unwrap();
      toast.success("Book borrowed successfully");
      navigate("/books");
    } catch (err: any) {
      const apiMsg =
        err?.data?.error ||
        err?.data?.message ||
        err?.error ||
        "Failed to borrow book";
      toast.error(apiMsg);
    }
  };

  if (isLoadingBook) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <LoadingSpinner size="lg" text="Loading book..." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Borrow Book</h1>
      {book && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-gray-500 mt-1">ISBN: {book.isbn}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Borrower Name
            </label>
            <input
              type="text"
              name="borrowerName"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
              value={form.borrowerName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Borrower Email
            </label>
            <input
              type="email"
              name="borrowerEmail"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@example.com"
              value={form.borrowerEmail}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min={1}
                max={10}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isLoading}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              disabled={isLoading}>
              {isLoading ? "Submitting..." : "Borrow"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowBook;
