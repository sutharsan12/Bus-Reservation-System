import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === '') {
      setErrors({
        username: 'Username is required'
      });
    } else if (password === '') {
      setErrors({
        password: 'Password is required'
      });
    } else if (email === '') {
      setErrors({
        email: 'Email is required'
      });
    } else {
      axios.post(API_URL + 'register/', {
        username,
        password,
        email
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('User created successfully');
          setErrors({}); 
          alert('User Created Successfully')
          window.location.href='/login';
        }
      })
        .catch((error) => {
          if (error.response.status === 400) {
            setErrors(error.response.data.errors || {});
          }
        });
    }
  }
  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
  <label>Username</label>
  {errors.username && <p className="text-danger font-weight-bold">{errors.username}</p>}
  <input
    type="text"
    name="username"
    className="form-control"
    value={username}
    onChange={handleUsernameChange}
  />
</div>
<div className="form-group">
  <label>Password</label>
  {errors.password && <p className="text-danger font-weight-bold">{errors.password}</p>}
  <input
    type="password"
    name="password"
    className="form-control"
    value={password}
    onChange={handlePasswordChange}
  />
</div>
<div className="form-group">
  <label>Email</label>
  {errors.email && <p className="text-danger font-weight-bold">{errors.email}</p>}
  <input
    type="email"
    name="email"
    className="form-control"
    value={email}
    onChange={handleEmailChange}
  />
</div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <Link to="/login" className="text-primary">Already have an account? Login</Link>
    </div>
  );
}

export default Register;