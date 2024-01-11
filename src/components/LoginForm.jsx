import React, { useState } from "react";
import { logIn } from "../utilities/users-service";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      //   const { error, ...dataToSend } = credentials;
      const user = await logIn(credentials);
      console.log(user);
    } catch {
      setCredentials({ ...credentials, error: "Sign Up Failed - Try Again" });
    }
  };

  return (
    <div>
      <div className="form-container" onSubmit={handleSubmit}>
        <form autoComplete="off">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default LoginForm;
