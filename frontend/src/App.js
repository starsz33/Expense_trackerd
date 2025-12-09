import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/expenses")
      .then(res => setExpenses(res.data));
  }, []);

  function addExpense() {
    if (!title || !amount) return;
    axios.post("http://localhost:5000/expenses", { title, amount })
      .then(() => {
        setTitle("");
        setAmount("");
        axios.get("http://localhost:5000/expenses")
          .then(res => setExpenses(res.data));
      });
  }

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Expense Tracker</h1>
          <p>Track your daily expenses</p>
        </header>

        <div className="summary">
          <h2>Total: {total.toFixed(2)} FRW</h2>
        </div>

        <div className="form-card">
          <h3>Add New Expense</h3>
          <div className="form">
            <input 
              type="text"
              placeholder="Expense title" 
              value={title}
              onChange={e => setTitle(e.target.value)} 
            />
            <input 
              type="number"
              placeholder="Amount" 
              value={amount}
              onChange={e => setAmount(e.target.value)} 
            />
            <button onClick={addExpense}>Add Expense</button>
          </div>
        </div>

        <div className="expenses-list">
          <h3>Recent Expenses</h3>
          {expenses.length === 0 ? (
            <p className="empty">No expenses yet. Add one above!</p>
          ) : (
            <ul>
              {expenses.map((e, i) => (
                <li key={i}>
                  <span className="title">{e.title}</span>
                  <span className="amount">{parseFloat(e.amount).toFixed(2)} FRW</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
