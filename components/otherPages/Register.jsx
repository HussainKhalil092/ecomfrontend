"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [error, setError] = useState(null);

  const togglePassword = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("https://ecom.reinsoft.site/api/signup", formData);
      console.log("Registration success:", response.data);

      // You can store token in localStorage or redirect
      localStorage.setItem("token", response.data.token);
      // Optionally redirect
      // router.push("/dashboard");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.errors || { general: ["Registration failed."] });
    }
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Register</h4>
            </div>
            <form onSubmit={handleSubmit} className="form-login form-has-password">
              <div className="wrap">
                <fieldset>
                  <input
                    type="text"
                    placeholder="Username or email address*"
                    name="username_or_email"
                    value={formData.username_or_email}
                    onChange={handleChange}
                    required
                  />
                </fieldset>

                <fieldset className="position-relative password-item">
                  <input
                    type={passwordType}
                    placeholder="Password*"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={`toggle-password ${passwordType !== "text" ? "unshow" : ""}`}
                    onClick={togglePassword}
                  >
                    <i className={`icon-eye-${passwordType !== "text" ? "hide" : "show"}-line`} />
                  </span>
                </fieldset>

                <fieldset className="position-relative password-item">
                  <input
                    type={confirmPasswordType}
                    placeholder="Confirm Password*"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={`toggle-password ${confirmPasswordType !== "text" ? "unshow" : ""}`}
                    onClick={toggleConfirmPassword}
                  >
                    <i className={`icon-eye-${confirmPasswordType !== "text" ? "hide" : "show"}-line`} />
                  </span>
                </fieldset>

                <div className="d-flex align-items-center">
                  <div className="tf-cart-checkbox">
                    <div className="tf-checkbox-wrapp">
                      <input defaultChecked type="checkbox" id="login-form_agree" name="agree_checkbox" />
                      <div>
                        <i className="icon-check" />
                      </div>
                    </div>
                    <label className="text-secondary-2" htmlFor="login-form_agree">
                      I agree to the&nbsp;
                    </label>
                  </div>
                  <Link href={`/term-of-use`} title="Terms of Service">
                    Terms of User
                  </Link>
                </div>

                {error &&
                  Object.entries(error).map(([field, messages]) =>
                    messages.map((msg, i) => (
                      <p key={`${field}-${i}`} className="text-danger">
                        {msg}
                      </p>
                    ))
                  )}
              </div>
              <div className="button-submit">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Register</span>
                </button>
              </div>
            </form>
          </div>

          <div className="right">
            <h4 className="mb_8">Already have an account?</h4>
            <p className="text-secondary">
              Welcome back. Sign in to access your personalized experience, saved preferences, and more.
            </p>
            <Link href={`/login`} className="tf-btn btn-fill">
              <span className="text text-button">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
