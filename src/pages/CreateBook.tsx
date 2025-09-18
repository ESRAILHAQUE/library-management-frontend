import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../store/api/libraryApi";
import BookForm from "../components/books/BookForm";
import toast from "react-hot-toast";

const CreateBook: React.FC = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleSubmit = async (bookData: any) => {
    try {
      await createBook(bookData).unwrap();
      toast.success("Book created successfully");
      navigate("/books");
    } catch (error: any) {
      const msg =
        error?.data?.error || error?.data?.message || "Failed to create book";
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    navigate("/books");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
        <p className="text-gray-600 mt-2">
          Add a new book to the library collection.
        </p>
      </div>

      <BookForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        title="Create New Book"
      />
    </div>
  );
};

export default CreateBook;
