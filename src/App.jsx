import { useState } from "react";
import LoginSignup from "./components/LoginSignup";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseList from "./components/ExpenseList";
import './components/ExpenseTracker.css'; // Importing common CSS for styling

function App() {
  // Track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // All expense data stored in this array
  const [allExpenses, setAllExpenses] = useState([
    { id: 1, description: "2 pack of sugars", amount: 50, category: "groceries" },
    { id: 2, description: "2 pack of biscuit", amount: 60, category: "groceries" },
    { id: 3, description: "electricity bill", amount: 100, category: "utilities" },
    { id: 4, description: "1 spotify subscription", amount: 30, category: "entertainment" },
    { id: 5, description: "2 boomplay subscription", amount: 30, category: "entertainment" }
  ]);

  // Keeps track of currently selected filter category
  const [filteredCategory, setFilteredCategory] = useState("");

  // Function to add a new expense item
  const addItem = (data) => {
    const newItem = { ...data, id: Math.floor(Math.random() * 10000) }; // Generate random ID
    setAllExpenses(prev => [...prev, newItem]); // Add item to state
  };

  // Function to delete an expense item by ID
  const deleteItem = (id) => {
    setAllExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Function to set the selected filter category
  const filterItem = (cat) => {
    setFilteredCategory(cat);
  };

  // Compute the list of expenses to display, based on selected category
  const displayedExpenses = filteredCategory
    ? allExpenses.filter(exp => exp.category === filteredCategory)
    : allExpenses;

  return (
    <>
      {!isLoggedIn ? (
        // If not logged in, show login/signup screen
        <LoginSignup onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // If logged in, show expense tracker features
        <>
          <ExpenseForm addExpense={addItem} />
          <ExpenseFilter filterItem={filterItem} />
          <ExpenseList items={displayedExpenses} deleteItem={deleteItem} />
        </>
      )}
    </>
  );
}

export default App;
