import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../store/api/libraryApi";
import BookForm from "../components/books/BookForm";

const CreateBook: React.FC = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleSubmit = async (bookData: any) => {
    try {
      await createBook(bookData).unwrap();
      navigate("/books");
    } catch (error) {
      console.error("Failed to create book:", error);
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
