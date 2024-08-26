import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './components/FormPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  // Function to add new data to the state
  const addData = (newData) => {
    setData([...data, newData]);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/form">Form</Link>
        </nav>
        <Routes>
          {/* Pass data and addData to HomePage */}
          <Route path="/" element={<HomePage data={data} setData={setData} />} />
          {/* Pass addData function to FormPage */}
          <Route path="/form" element={<FormPage addData={addData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;