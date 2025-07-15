import React from 'react';
import './ExpenseTracker.css'; // Import custom styles

// ExpenseList component to display a table of expenses
const ExpenseList = ({ items, deleteItem }) => {
  // Calculate total amount by summing all item amounts
  const total = items.reduce((acc, item) => acc + parseFloat(item.amount), 0);

  return (
    <div className="expense-card"> {/* Styled card for expense list */}
      <h4 className="expense-heading">Expense List</h4>

      {/* Table to show list of expenses */}
      <table className="table table-bordered text-center">
        <thead className="table-dark"> {/* Table headers */}
          <tr>
            <th>Description</th>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* Map through items and render each row */}
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{item.category}</td>
              <td>
                {/* Button to delete individual item */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* Display total of all items */}
          <tr className="table-light">
            <td><strong>Total</strong></td>
            <td><strong>₹{total.toFixed(2)}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
