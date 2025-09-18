import React from "react";

const BorrowSummary: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Borrow Summary</h1>
      <p className="text-gray-600 mb-4">
        View a summary of all borrowed books and their quantities.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">
          Borrow summary will be displayed here...
        </p>
      </div>
    </div>
  );
};

export default BorrowSummary;
