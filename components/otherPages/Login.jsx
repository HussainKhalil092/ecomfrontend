"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload with the field name 'username_or_email' to match backend
    const formData = {
      username_or_email: usernameOrEmail,
      password,
    };

    try {
      // Send POST request to the backend
      const response = await fetch("https://ecom.reinsoft.site/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log("Login successful", data);
        // You can store the token in localStorage or handle redirection here
      } else {
        // Handle error from the backend
        const errorData = await response.json();
        setError(errorData.errors ? errorData.errors.username_or_email : "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login request failed", err);
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Login</h4>
            </div>
            <form onSubmit={handleSubmit} className="form-login form-has-password">
              <div className="wrap">
                <fieldset>
                  <input
                    className=""
                    type="text"
                    placeholder="Username or email address*"
                    name="username_or_email"
                    tabIndex={2}
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="position-relative password-item">
                  <input
                    className="input-password"
                    type={passwordType}
                    placeholder="Password*"
                    name="password"
                    tabIndex={2}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-required="true"
                    required
                  />
                  <span
                    className={`toggle-password ${
                      !(passwordType === "text") ? "unshow" : ""
                    }`}
                    onClick={togglePassword}
                  >
                    <i
                      className={`icon-eye-${
                        !(passwordType === "text") ? "hide" : "show"
                      }-line`}
                    />
                  </span>
                </fieldset>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="tf-cart-checkbox">
                    <div className="tf-checkbox-wrapp">
                      <input
                        defaultChecked
                        className=""
                        type="checkbox"
                        id="login-form_agree"
                        name="agree_checkbox"
                      />
                      <div>
                        <i className="icon-check" />
                      </div>
                    </div>
                    <label htmlFor="login-form_agree"> Remember me </label>
                  </div>
                  <Link
                    href={`/forget-password`}
                    className="font-2 text-button forget-password link"
                  >
                    Forgot Your Password?
                  </Link>
                </div>
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Login</span>
                </button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="right">
            <h4 className="mb_8">New Customer</h4>
            <p className="text-secondary">
              Be part of our growing family of new customers! Join us today and
              unlock a world of exclusive benefits, offers, and personalized
              experiences.
            </p>
            <Link href={`/register`} className="tf-btn btn-fill">
              <span className="text text-button">Register</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
