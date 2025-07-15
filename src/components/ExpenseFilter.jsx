import React from 'react';
import './ExpenseTracker.css'; // Importing CSS for styling

// This component receives a filterItem function from its parent via props
const ExpenseFilter = ({ filterItem }) => {
  return (
    <div className="expense-card"> {/* Wrapper for consistent styling */}
      <select
        className="form-select"
        onChange={(e) => filterItem(e.target.value)} // Call parent function on change
      >
        <option value="">Filter by Category</option> {/* Default option */}
        <option value="utilities">Utilities</option> {/* Filter option */}
        <option value="entertainment">Entertainment</option>
        <option value="groceries">Groceries</option>
      </select>
    </div>
  );
};

export default ExpenseFilter;
