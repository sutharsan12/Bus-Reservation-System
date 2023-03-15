import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const errors = validate(user);

    if (Object.keys(errors).length === 0) {

      fetch("http://127.0.0.1:8000/api/register/")
        .then((response) => response.json())
        .then((data) => {
          const userMatch = data.find((storedUser) => storedUser.username === username);
          if (!userMatch) {

            setMessage("Username not found");
          } else {

            const storedPassword = userMatch.password;
            if (password === storedPassword) {
              setMessage("Login successful");
              alert("login successful");
              axios.post(API_URL + 'login/', {
                username,
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
              window.location.href = "/buses";
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

    if (!user.username.trim()) {
      errors.username = "Username is required";
    } else if (user.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
    }

    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
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
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-danger">{errors.username}</p>}
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
      <Link to="/register" className="text-primary">Don't have an account? Login</Link>
    </div>

  );

}

export default Login;