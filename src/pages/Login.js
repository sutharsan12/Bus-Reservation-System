import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    const errors = validate(user);

    if (Object.keys(errors).length === 0) {

      fetch("http://127.0.0.1:8000/api/register/")
        .then((response) => response.json())
        .then((data) => {
          const userMatch = data.find((storedUser) => storedUser.email === email);
          if (!userMatch) {

            setMessage("Email not found");
          } else {

            const storedPassword = userMatch.password;
            if (password === storedPassword) {
              setMessage("Login successful");
              alert("login successful");
              axios.post(API_URL + 'login/', {
                email,
                password
              })
                .then((response) => {
                  if (response.status === 200) {
                    console.log('User logged in successfully');
                    setErrors({});
                    alert('User Logged In Successfully')
                    window.location.href = '/';
                  }
                })
              window.location.href = "/bussearch";
            } else {
              setMessage("Incorrect password");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(errors);
    }
  }

  function validate(user) {
    let errors = {};

    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (user.email.length < 2) {
      errors.email = 'Email is not found';
    }

    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  }

  return (
    <div className="container">
      <h2 className="text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label>
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <div class="row mt-3">
          <div class="col-sm-3"></div>
          <div class="col-sm-3"></div>
          <div class="col-sm-3"></div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {message && (
          <div className="mt-3">
            <span className="text-danger">{message}</span>
          </div>
        )}
      </form>
      <Link to="/register" className="text-primary">Don't have an account? Register</Link>
    </div>

  );

}

export default Login;