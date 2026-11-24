import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from '../api/api';

export default function Contact() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    await apiRequest('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    // Show thank-you message only after successful saving
    setSubmitted(true);

    // Redirect to Home after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
      <h1 style={{ marginBottom: "20px" }}>Contact Me</h1>

      {/* Thank-you message */}
      {submitted && (
        <div style={{ 
          padding: "15px",
          backgroundColor: "#e6ffe6",
          border: "1px solid #66cc66",
          borderRadius: "6px",
          marginBottom: "20px",
          fontWeight: "bold"
        }}>
          Thank you, {formData.firstName} {formData.lastName}. Your message has been safely saved.
        </div>
      )}

      {!submitted && (
        <>
          <p style={{ marginBottom: "20px" }}>
            I'd love to hear from you! Reach out with questions, feedback, or just to say hello.
          </p>

          {error && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Error: {error}
            </p>
          )}

          {loading && (
            <p>Sending your message...</p>
          )}

          <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
            <div style={{ marginBottom: "15px" }}>
              <label>First Name:</label><br />
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                style={{ width: "50%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Last Name:</label><br />
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                style={{ width: "50%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Contact Number:</label><br />
              <input
                type="text"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                style={{ width: "50%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email:</label><br />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ width: "50%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Message:</label><br />
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                style={{ width: "50%", padding: "8px", resize: "vertical" }}
              ></textarea>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                type={loading ? "Sending..." : "Submit"}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "navy",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Submit
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </>
      )}

      <div style={{ marginTop: "40px" }}>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:ablizsattar@gmail.com">ablizsattar@gmail.com</a>
        </p>
        <p>
          <strong>Phone:</strong> +1 (289) 772-7222
        </p>
      </div>
    </div>
  );
}
