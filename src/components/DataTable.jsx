import React, { useState } from 'react';

/**
 * Simple DataTable Component
 * Props:
 * - title: string
 * - columns: array of { header, render: fn(row) }
 * - data: array
 * - onToggle: fn(row, newVal) (optional)
 * - actions: fn(row) => React node (optional)
 * - pagination: { currentPage, totalPages, onPageChange } (optional)
 */
const DataTable = ({ title, columns, data, onToggle, actions, pagination }) => {
  const [page, setPage] = useState(pagination?.currentPage || 1);

  const changePage = newPage => {
    setPage(newPage);
    pagination?.onPageChange(newPage);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {/* Header */}
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

      {/* Table Headers */}
      <div className={`grid grid-cols-[${'auto '.repeat(columns.length)}] gap-5 font-semibold text-sm text-gray-600 border-b pb-3`}>  
        {columns.map((col, i) => <div key={i}>{col.header}</div>)}
      </div>

      {/* Table Rows */}
      {data.length > 0 ? (
        data.map((row, idx) => (
          <div key={idx} className="grid grid-cols-[${'auto '.repeat(columns.length)}] gap-5 py-4 border-b text-sm">
            {columns.map((col, i) => <div key={i}>{col.render(row)}</div>)}
            {onToggle && (
              <div>
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={e => onToggle(row, e.target.checked)}
                />
              </div>
            )}
            {actions && <div className="flex space-x-3">{actions(row)}</div>}
          </div>
        ))
      ) : (
        <div className="py-12 text-center text-gray-500">
          <p className="font-bold text-lg">No data to display</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="mt-6 flex items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="font-bold disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => changePage(p)}
                className={`w-8 h-8 rounded-full ${p === page ? 'bg-primary-100 text-primary-600' : 'text-gray-600'} flex items-center justify-center`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            disabled={page === pagination.totalPages}
            onClick={() => changePage(page + 1)}
            className="font-bold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
