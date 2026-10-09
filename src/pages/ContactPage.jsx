import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ARTIST_INFO } from "../data/artist";
import { sound } from "../utils/sound";
import { Mail, Send, Copy, CheckCircle, ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Art Inquiry",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Your name is required";
    if (!formData.email.trim()) errors.email = "Your contact email is required";
    if (!formData.message.trim()) errors.message = "Message cannot be empty";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sound.playPencilClick();
      return;
    }

    sound.playPencilClick();
    setSubmitted(true);

    const subject = encodeURIComponent(`[JUSWA ART] ${formData.subject}: ${formData.name}`);
    const body = encodeURIComponent(
      `Hello JUSWA,\n\n` +
      `From: ${formData.name} (${formData.email})\n` +
      `Inquiry Category: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n`
    );

    window.open(`mailto:${ARTIST_INFO.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const copyMessage = () => {
    const text =
      `From: ${formData.name || "Visitor"}\n` +
      `Email: ${formData.email || "No email"}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message || "(No message written)"}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playPencilClick();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="contact-page" style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 1.5rem 6rem" }}>
      {/* Last Sheet of Sketchbook aesthetic */}
      <div
        style={{
          position: "relative",
          backgroundColor: "var(--bg-card)",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          padding: "clamp(2rem, 5vw, 4rem)",
          boxShadow: "var(--card-shadow-hover)"
        }}
      >
        {/* Washi Tape Header */}
        <div
          className="washi-tape"
          style={{
            top: "-10px",
            left: "40px",
            width: "90px",
            height: "18px"
          }}
        />

        {/* Handwritten Heading */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
          <span
            className="font-hand"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--lavender-accent)",
              display: "block",
              marginBottom: "0.25rem"
            }}
          >
            LET'S MAKE SOMETHING.
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.85rem)",
              lineHeight: 1.15,
              marginBottom: "1rem"
            }}
          >
            Leave a Note in the Sketchbook
          </h1>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            Whether you have a commission inquiry, want to discuss character concepts,
            or just want to say hello to another fellow artist—my inbox is always open.
          </p>
        </div>

        {/* Grid: Direct Contact Channels & Functional Message Form */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "start"
          }}
        >
          {/* Direct Channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Studio Email Card */}
            <div
              style={{
                backgroundColor: "var(--bg-main)",
                padding: "1.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <Mail size={18} color="var(--lavender-accent)" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Direct Studio Email</h3>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                Best for formal commission briefs, high-res file exchange, or publishing questions.
              </p>
              <a
                href={`mailto:${ARTIST_INFO.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  color: "var(--lavender-accent)",
                  textDecoration: "none",
                  fontWeight: 600
                }}
                className="pencil-underline"
              >
                {ARTIST_INFO.email}
              </a>
            </div>

            {/* Commission Board Shortcut */}
            <div
              style={{
                backgroundColor: "var(--bg-main)",
                padding: "1.75rem",
                borderRadius: "6px",
                border: "1px dashed var(--lavender-accent)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <Sparkles size={18} color="var(--lavender-accent)" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Looking to Commission?</h3>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                View our pricing table (sketches from ₱150, rendered from ₱650) and use our instant price calculator.
              </p>
              <Link
                to="/commissions"
                onClick={() => sound.playPageTurn()}
                className="btn-primary"
                style={{ width: "100%", padding: "0.65rem 1rem", fontSize: "0.85rem" }}
              >
                Go to Commissions Page
              </Link>
            </div>

            {/* Social Art DMs */}
            <div
              style={{
                backgroundColor: "var(--bg-main)",
                padding: "1.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border-color)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <MessageSquare size={18} color="var(--lavender-accent)" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Social Direct Messages</h3>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                You can reach me directly under <strong>{ARTIST_INFO.handle}</strong> on:
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {ARTIST_INFO.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "4px",
                      border: "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-primary)",
                      fontSize: "0.82rem",
                      textDecoration: "none"
                    }}
                  >
                    <span>{soc.name}</span>
                    <ArrowUpRight size={12} color="var(--lavender-accent)" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Functional Message Form */}
          <div
            style={{
              backgroundColor: "var(--bg-main)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "2rem"
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", marginBottom: "0.5rem" }}>
              Send a Note
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Prepares your message and opens your email application, or allows instant copying to clipboard.
            </p>

            {submitted && (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "4px",
                  backgroundColor: "rgba(52, 211, 153, 0.12)",
                  border: "1px solid #34D399",
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem"
                }}
              >
                <CheckCircle size={16} color="#34D399" />
                <span>Message prepared in your email client!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Robin"
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "4px",
                    border: `1px solid ${formErrors.name ? "#EF4444" : "var(--border-color)"}`,
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem"
                  }}
                />
                {formErrors.name && (
                  <span style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.2rem", display: "block" }}>
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. robin@example.com"
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "4px",
                    border: `1px solid ${formErrors.email ? "#EF4444" : "var(--border-color)"}`,
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem"
                  }}
                />
                {formErrors.email && (
                  <span style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.2rem", display: "block" }}>
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem"
                  }}
                >
                  <option value="General Art Inquiry">General Art Inquiry</option>
                  <option value="Commission Question">Commission Question</option>
                  <option value="Collaboration Proposal">Collaboration Proposal</option>
                  <option value="Just Saying Hello">Just Saying Hello</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your note or message here..."
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.85rem",
                    borderRadius: "4px",
                    border: `1px solid ${formErrors.message ? "#EF4444" : "var(--border-color)"}`,
                    backgroundColor: "var(--bg-card)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.5
                  }}
                />
                {formErrors.message && (
                  <span style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.2rem", display: "block" }}>
                    {formErrors.message}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: "0.75rem 1rem", fontSize: "0.88rem" }}
                >
                  <Send size={15} />
                  <span>Send via Email</span>
                </button>

                <button
                  type="button"
                  onClick={copyMessage}
                  className="btn-secondary"
                  style={{ padding: "0.75rem 1rem", fontSize: "0.88rem" }}
                  title="Copy text to clipboard"
                >
                  <Copy size={15} />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Final Handwritten Signature & Mark */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px dashed var(--border-color)",
            textAlign: "center"
          }}
        >
          <div
            className="font-hand"
            style={{
              fontSize: "2rem",
              color: "var(--lavender-accent)",
              marginBottom: "0.3rem"
            }}
          >
            JUSWA
          </div>
          <div
            style={{
              fontSize: "0.82rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)"
            }}
          >
            The Anatomy of a Stroke • End of the Notebook
          </div>
        </div>
      </div>
    </div>
  );
}
