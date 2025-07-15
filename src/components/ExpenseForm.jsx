import React from 'react';
import { useForm } from 'react-hook-form'; // Importing hook for form handling
import './ExpenseTracker.css'; // Custom styles

// Functional component to add new expense
const ExpenseForm = ({ addExpense }) => {
  // useForm hook to manage form data, validation and reset
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  return (
    <div className="expense-card"> {/* Styled container */}
      <h3 className="expense-heading">Add New Expense</h3>

      {/* Form submission triggers handleSubmit from react-hook-form */}
      <form onSubmit={handleSubmit((data) => {
        addExpense(data); // Pass data to parent component
        reset(); // Reset form after submit
      })}>

        {/* Description input with validation */}
        <div className='form-group mb-3'>
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            {...register("description", { required: true, minLength: 6 })}
          />
          {errors.description?.type === "required" && (
            <small className="text-danger">This field is required</small>
          )}
          {errors.description?.type === "minLength" && (
            <small className="text-danger">Minimum 6 characters</small>
          )}
        </div>

        {/* Amount input with required validation */}
        <div className='form-group mb-3'>
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            {...register("amount", { required: true })}
          />
          {errors.amount && (
            <small className="text-danger">Amount is required</small>
          )}
        </div>

        {/* Category dropdown with validation */}
        <div className='form-group mb-3'>
          <label>Category</label>
          <select
            className="form-select"
            {...register("category", { required: true })}
          >
            <option value="">Select category</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="groceries">Groceries</option>
          </select>
          {errors.category && (
            <small className="text-danger">Category is required</small>
          )}
        </div>

        {/* Submit button */}
        <button className="btn btn-success w-100">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
