import React from "react";
import { useParams } from "react-router-dom";

const BorrowBook: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Borrow Book</h1>
      <p className="text-gray-600 mb-4">
        Borrow the selected book from the library.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Book ID: {bookId}</p>
        <p className="text-gray-500 mt-2">
          Borrow form will be displayed here...
        </p>
      </div>
    </div>
  );
};

export default BorrowBook;
