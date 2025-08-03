import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    idNumber: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage('Registration successful!');
        setFormData({ fullName: '', phoneNumber: '', idNumber: '' });
      } else {
        setResponseMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>SIM Card Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        /><br />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Register</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
