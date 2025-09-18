import React from "react";
import { useParams } from "react-router-dom";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Details</h1>
      <p className="text-gray-600 mb-4">
        Detailed information about the selected book.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Book ID: {id}</p>
        <p className="text-gray-500 mt-2">
          Book details will be displayed here...
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
