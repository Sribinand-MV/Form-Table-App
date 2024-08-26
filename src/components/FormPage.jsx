import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage({ addData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone.length < 8 || formData.phone.length > 13) {
      newErrors.phone = 'Phone number must be between 8 and 13 digits';
    }
    if (formData.password.length < 6 || !/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters and include a special character';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Call addData function passed from parent component (App.js)
      addData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <h2>Submit Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;