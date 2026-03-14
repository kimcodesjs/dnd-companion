import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Reusable Components/BackButton";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // TODO: implement account creation logic
    } else {
      // TODO: implement login logic
    }
  };

  const handleNewUser = () => {
    setIsNewUser(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  const handleReturningUser = () => {
    setIsNewUser(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  return (
    <div className="login">
      <BackButton />
      <div className="login-card">
        <h1 className="login-title">{isNewUser ? "Create Account" : "Welcome Back"}</h1>
        <p className="login-subtitle">
          {isNewUser
            ? "Join the DnD DM Companion"
            : "Sign in to your DnD DM Companion"}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {isNewUser && (
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="DungeonMaster42"
                required
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {isNewUser && (
            <div className="login-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button type="submit" className="login-submit">
            {isNewUser ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="login-alternatives">
          <button type="button" className="login-guest" onClick={() => navigate("/dash")}>
            Continue as Guest
          </button>
          {isNewUser ? (
            <button
              type="button"
              className="login-toggle"
              onClick={handleReturningUser}
            >
              Already have an account?
            </button>
          ) : (
            <button
              type="button"
              className="login-toggle"
              onClick={handleNewUser}
            >
              I'm new here!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
