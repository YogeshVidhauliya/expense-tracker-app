import React, { useEffect, useState } from 'react';
import './LoginSignup.css';

// Importing images for input icons
import user_icon from '../assets/username.png';
import email_icon from '../assets/email.jpg';
import password_icon from '../assets/password.png';

const LoginSignup = ({ onLogin }) => {
  const [action, setAction] = useState("Login"); // Toggle between Login and Sign Up
  const [users, setUsers] = useState([]); // Stores registered users
  const [form, setForm] = useState({ name: '', email: '', password: '' }); // Form data
  const [error, setError] = useState(''); // For showing form validation errors

  // Load existing users from localStorage when component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Update localStorage when the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Basic email format validator
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Form submit handler for Login or Sign Up
  const handleSubmit = () => {
    if (action === "Sign Up") {
      // Check for empty fields
      if (!form.name || !form.email || !form.password) {
        setError("All fields are required.");
        return;
      }
      // Email validation
      if (!validateEmail(form.email)) {
        setError("Invalid email format. Use example@domain.com");
        return;
      }
      // Check if email already exists
      const existing = users.find(user => user.email === form.email);
      if (existing) {
        setError("Email already registered.");
        return;
      }

      // Add new user and reset form
      const newUsers = [...users, form];
      setUsers(newUsers);
      setError('');
      setAction("Login");
      alert("Registered successfully. Please login.");
      setForm({ name: '', email: '', password: '' });

    } else {
      // Login validation
      if (!form.email || !form.password) {
        setError("Email and Password are required.");
        return;
      }
      if (!validateEmail(form.email)) {
        setError("Invalid email format.");
        return;
      }

      // Find matching user
      const validUser = users.find(user => user.email === form.email && user.password === form.password);
      if (validUser) {
        setError('');
        onLogin(); // Notify parent component of successful login
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className='container'>
      {/* App title */}
      <h2 style={{
        textAlign: 'center',
        marginBottom: '10px',
        color: '#006400',
        fontWeight: 'bold',
        fontSize: '28px',
        letterSpacing: '1px'
      }}>
        Expense Tracker App
      </h2>

      {/* Login/SignUp toggle header */}
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      {/* Input fields */}
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <p style={{ color: 'red', paddingLeft: '60px', marginTop: '10px' }}>{error}</p>
      )}

      {/* Forgot password link for login */}
      {action === "Login" && (
        <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
      )}

      {/* Buttons to switch between Login and Sign Up */}
      <div className="submit-container">
        <div
          className="submit green-button"
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className="submit blue-button"
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      {/* Submit button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="submit purple-button" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
