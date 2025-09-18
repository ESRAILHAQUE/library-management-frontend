import React from "react";
import { useGetBorrowSummaryQuery } from "../store/api/libraryApi";
import LoadingSpinner from "../components/common/LoadingSpinner";

const BorrowSummary: React.FC = () => {
  const { data = [], isLoading, error } = useGetBorrowSummaryQuery();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Borrow Summary</h1>
      <p className="text-gray-600 mb-4">
        View a summary of all borrowed books and their quantities.
      </p>

      <div className="bg-white p-6 rounded-lg shadow">
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading borrow summary..." />
        ) : error ? (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
            Failed to load summary
          </div>
        ) : data.length === 0 ? (
          <div className="text-gray-500">No active borrows found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Quantity Borrowed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borrow Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.bookTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {row.bookISBN}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.totalQuantityBorrowed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.borrowCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
