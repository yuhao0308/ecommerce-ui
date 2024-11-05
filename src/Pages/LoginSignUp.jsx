import React, { useState } from 'react';
import './CSS/LoginSignUp.css';
import { API_URL } from '../config';

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const loginHandler = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      responseData = data;
    })
    if (responseData.success) {
      localStorage.setItem("token", responseData.token);
      window.location.href = "/";
    } else {
      alert(responseData.message);
    }
  }

  const signupHandler = async () => {
    if (!agree) {
      alert("Please check the box to agree to the terms of use and privacy policy before continuing.");
      return;
    }

    console.log("Sign Up Function Executed", formData);
    let responseData;
    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      responseData = data;
    });

    if (responseData.success) {
      localStorage.setItem("token", responseData.token);
      window.location.href = "/";
    } else {
      alert(responseData.message);
    }
  }

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state === "Sign Up" ?
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="User Name"
              onChange={handleChange}
            /> :
            <></>
          }
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button onClick={state === "Login" ? loginHandler : signupHandler}>
          Continue
        </button>

        {state === "Sign Up" &&
          <div className="login-signup-agree">
            <input type="checkbox" name="agree" id="agree" onChange={() => setAgree(!agree)} />
            <label htmlFor="agree">
              By continuing, I agree to the terms of use and privacy policy.
            </label>
          </div>
        }

        {state === "Sign Up" ?
          <p className="login-signup-login">
            Already have an account?{' '}
            <span onClick={() => setState("Login")}>Login here</span>
          </p> :
          <p className="login-signup-login">
            Create an account?{' '}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        }
      </div>
    </div>
  );
};

export default LoginSignUp;
