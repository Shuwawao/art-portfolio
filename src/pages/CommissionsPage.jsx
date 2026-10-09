import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  COMMISSION_TIERS,
  RENDERED_TIERS,
  COMMISSION_ADDONS,
  COMMISSION_STEPS,
  COMMISSION_TERMS
} from "../data/commissions";
import { ARTIST_INFO } from "../data/artist";
import { sound } from "../utils/sound";
import {
  CheckCircle,
  Copy,
  Mail,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  AlertCircle,
  Calculator
} from "lucide-react";

export default function CommissionsPage() {
  const [activeTab, setActiveTab] = useState("sketch"); // 'sketch' or 'rendered'

  // Interactive Calculator State
  const [selectedTierId, setSelectedTierId] = useState("half-body-sketch");
  const [characterCount, setCharacterCount] = useState(1);
  const [backgroundType, setBackgroundType] = useState("none"); // 'none', 'simple', 'detailed'
  const [commercialRights, setCommercialRights] = useState(false);
  const [rushDelivery, setRushDelivery] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    contactMethod: "",
    commissionType: "Half-Body Sketch (₱300)",
    description: "",
    referenceLinks: "",
    budget: "₱300 – ₱600",
    deadline: "",
    intendedUsage: "Personal (Social media / Avatar / Wallpapers)"
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Calculate estimated price
  const calculateTotal = () => {
    let base = 300;
    const allTiers = [...COMMISSION_TIERS, ...RENDERED_TIERS];
    const tier = allTiers.find((t) => t.id === selectedTierId);
    if (tier) base = tier.pricePHP;

    let total = base;

    // Additional characters (+75% each)
    if (characterCount > 1) {
      total += base * 0.75 * (characterCount - 1);
    }

    // Background
    if (backgroundType === "simple") total += 200;
    if (backgroundType === "detailed") total += 800;

    // Commercial rights (+100%)
    if (commercialRights) total += base * 1.0;

    // Rush delivery (+50%)
    if (rushDelivery) total += base * 0.5;

    return Math.round(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clientName.trim()) errors.clientName = "Name or alias is required";
    if (!formData.contactMethod.trim()) errors.contactMethod = "Email or social handle is required";
    if (!formData.description.trim()) errors.description = "Please describe your character or concept";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sound.playPencilClick();
      return;
    }

    sound.playPencilClick();
    setSubmitted(true);

    // Prepare mailto link
    const subject = encodeURIComponent(`Commission Inquiry: ${formData.commissionType} - ${formData.clientName}`);
    const body = encodeURIComponent(
      `Hi JUSWA,\n\nI would like to inquire about a digital art commission.\n\n` +
      `Client Name / Alias: ${formData.clientName}\n` +
      `Contact Method: ${formData.contactMethod}\n` +
      `Commission Type: ${formData.commissionType}\n` +
      `Estimated Budget: ${formData.budget}\n` +
      `Desired Deadline: ${formData.deadline || "Flexible"}\n` +
      `Intended Usage: ${formData.intendedUsage}\n` +
      `Reference Links: ${formData.referenceLinks || "Will send via reply"}\n\n` +
      `Project Description:\n${formData.description}\n\n` +
      `Looking forward to collaborating with you!\n`
    );

    window.open(`mailto:${ARTIST_INFO.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const copyInquirySummary = () => {
    const summaryText =
      `[JUSWA COMMISSION INQUIRY]\n` +
      `Client: ${formData.clientName || "(Not specified)"}\n` +
      `Contact: ${formData.contactMethod || "(Not specified)"}\n` +
      `Type: ${formData.commissionType}\n` +
      `Budget: ${formData.budget}\n` +
      `Deadline: ${formData.deadline || "Flexible"}\n` +
      `Usage: ${formData.intendedUsage}\n` +
      `References: ${formData.referenceLinks || "Will attach in DM"}\n` +
      `Description: ${formData.description || "Inquiry summary"}\n`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    sound.playPencilClick();
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="commissions-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "3.5rem 1.5rem 6rem" }}>
      {/* Header Section */}
      <div style={{ maxWidth: "780px", marginBottom: "3.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            backgroundColor: "var(--bg-card)",
            border: "1px dashed var(--lavender-accent)",
            marginBottom: "1rem"
          }}
        >
          <Sparkles size={13} color="var(--lavender-accent)" />
          <span className="font-hand" style={{ fontSize: "1.1rem", color: "var(--lavender-accent)" }}>
            COMMISSIONS OPEN
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.1,
            marginBottom: "1rem"
          }}
        >
          Let’s Create Something
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
          I accept private commissions for portraits, character designs, and expressive digital illustrations.
          Below you'll find clear pricing, rendering tiers, workflow milestones, and a transparent inquiry form.
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.85rem",
            padding: "0.4rem 0.85rem",
            borderRadius: "6px",
            backgroundColor: "var(--bg-subtle)",
            border: "1px solid var(--border-color)"
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34D399" }} />
          <span>Current Status: <strong>Open for 3 Slots</strong> (Turnaround ~5–10 days)</span>
        </div>
      </div>

      {/* =========================================================================
          TIER TABS: SKETCH VS FULLY RENDERED
          ========================================================================= */}
      <div style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "1rem"
          }}
        >
          <button
            onClick={() => {
              sound.playPencilClick();
              setActiveTab("sketch");
            }}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "4px",
              border: `1px solid ${activeTab === "sketch" ? "var(--lavender-accent)" : "var(--border-color)"}`,
              backgroundColor: activeTab === "sketch" ? "var(--bg-card)" : "transparent",
              color: activeTab === "sketch" ? "var(--lavender-accent)" : "var(--text-secondary)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Pencil & Graphite Sketches (Starting ₱150)
          </button>

          <button
            onClick={() => {
              sound.playPencilClick();
              setActiveTab("rendered");
            }}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "4px",
              border: `1px solid ${activeTab === "rendered" ? "var(--lavender-accent)" : "var(--border-color)"}`,
              backgroundColor: activeTab === "rendered" ? "var(--bg-card)" : "transparent",
              color: activeTab === "rendered" ? "var(--lavender-accent)" : "var(--text-secondary)",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Fully Rendered Paintings (Starting ₱650)
          </button>
        </div>

        {/* SKETCHES TIERS */}
        {activeTab === "sketch" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.75rem",
                marginBottom: "3rem"
              }}
            >
              {COMMISSION_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderRadius: "6px",
                    border: "1px solid var(--border-color)",
                    padding: "1.75rem",
                    boxShadow: "var(--card-shadow)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600 }}>
                      {tier.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--lavender-accent)"
                      }}
                    >
                      {tier.priceLabel}
                    </div>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
                    {tier.description}
                  </p>

                  <div
                    style={{
                      borderTop: "1px dashed var(--border-color)",
                      paddingTop: "1rem",
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.45rem",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    <div><strong>Rendering:</strong> {tier.renderingLevel}</div>
                    <div><strong>Turnaround:</strong> {tier.turnaround}</div>
                    <div><strong>Deliverables:</strong> {tier.deliverables}</div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playPencilClick();
                      setSelectedTierId(tier.id);
                      setFormData((prev) => ({
                        ...prev,
                        commissionType: `${tier.title} (${tier.priceLabel})`
                      }));
                      const formEl = document.getElementById("commission-form");
                      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-secondary"
                    style={{ marginTop: "1.25rem", width: "100%", padding: "0.6rem" }}
                  >
                    Select this Option
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FULLY RENDERED TIERS */}
        {activeTab === "rendered" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem"
              }}
            >
              {RENDERED_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderRadius: "6px",
                    border: "1px solid var(--border-color)",
                    padding: "2rem",
                    boxShadow: "var(--card-shadow)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 600 }}>
                      {tier.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.45rem",
                        fontWeight: 700,
                        color: "var(--lavender-accent)"
                      }}
                    >
                      {tier.priceLabel}
                    </div>
                  </div>

                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {tier.description}
                  </p>

                  <div
                    style={{
                      borderTop: "1px dashed var(--border-color)",
                      paddingTop: "1rem",
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    <div><strong>Rendering:</strong> {tier.renderingLevel}</div>
                    <div><strong>Turnaround:</strong> {tier.turnaround}</div>
                    <div><strong>Deliverables:</strong> {tier.deliverables}</div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playPencilClick();
                      setSelectedTierId(tier.id);
                      setFormData((prev) => ({
                        ...prev,
                        commissionType: `${tier.title} (${tier.priceLabel})`
                      }));
                      const formEl = document.getElementById("commission-form");
                      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-primary"
                    style={{ marginTop: "1.5rem", width: "100%", padding: "0.75rem" }}
                  >
                    Select this Render Tier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          ADD-ONS & OPTIONS BREAKDOWN
          ========================================================================= */}
      <section style={{ marginBottom: "5rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1.5rem" }}>
          Add-ons & Scope Options
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem"
          }}
        >
          {COMMISSION_ADDONS.map((addon) => (
            <div
              key={addon.name}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                padding: "1.25rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 600 }}>{addon.name}</h4>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--lavender-accent)" }}>
                  {addon.price}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE ESTIMATOR / CALCULATOR
          ========================================================================= */}
      <section
        style={{
          padding: "2.5rem",
          borderRadius: "8px",
          backgroundColor: "var(--bg-subtle)",
          border: "1px solid var(--border-color)",
          marginBottom: "5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <Calculator size={20} color="var(--lavender-accent)" />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem" }}>
            Instant Price Estimator
          </h2>
        </div>
        <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Configure your desired commission specifications to view an instant estimate in Philippine Pesos (₱).
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Tier Select */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Base Commission Tier:
              </label>
              <select
                value={selectedTierId}
                onChange={(e) => setSelectedTierId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              >
                <optgroup label="Pencil / Graphite Sketches">
                  {COMMISSION_TIERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — {t.priceLabel}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Fully Rendered Paintings">
                  {RENDERED_TIERS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — {t.priceLabel}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Character count */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Number of Characters: {characterCount}
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCharacterCount(num)}
                    style={{
                      padding: "0.4rem 1rem",
                      borderRadius: "4px",
                      border: `1px solid ${characterCount === num ? "var(--lavender-accent)" : "var(--border-color)"}`,
                      backgroundColor: characterCount === num ? "var(--bg-card)" : "transparent",
                      color: characterCount === num ? "var(--lavender-accent)" : "var(--text-primary)",
                      cursor: "pointer"
                    }}
                  >
                    {num} {num === 1 ? "Character" : "Characters"}
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Background Complexity:
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  { id: "none", label: "Clean / Transparent (₱0)" },
                  { id: "simple", label: "Simple Atmosphere (+₱200)" },
                  { id: "detailed", label: "Detailed Scene (+₱800)" }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setBackgroundType(bg.id)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "4px",
                      border: `1px solid ${backgroundType === bg.id ? "var(--lavender-accent)" : "var(--border-color)"}`,
                      backgroundColor: backgroundType === bg.id ? "var(--bg-card)" : "transparent",
                      color: backgroundType === bg.id ? "var(--lavender-accent)" : "var(--text-primary)",
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={commercialRights}
                  onChange={(e) => setCommercialRights(e.target.checked)}
                  style={{ accentColor: "var(--lavender-accent)" }}
                />
                <span>Commercial Usage Rights (+100% base price)</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={rushDelivery}
                  onChange={(e) => setRushDelivery(e.target.checked)}
                  style={{ accentColor: "var(--lavender-accent)" }}
                />
                <span>Rush Priority Delivery (+50% base price)</span>
              </label>
            </div>
          </div>

          {/* Calculator Result Box */}
          <div
            style={{
              padding: "2rem",
              borderRadius: "8px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--lavender-accent)",
              textAlign: "center",
              boxShadow: "var(--card-shadow)"
            }}
          >
            <span
              className="font-hand"
              style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}
            >
              Estimated Investment
            </span>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "2.8rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0.5rem 0"
              }}
            >
              ₱{calculateTotal().toLocaleString()}
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              * Initial estimate in Philippine Pesos. 50% deposit required upon sketch kickoff.
            </p>

            <button
              onClick={() => {
                sound.playPencilClick();
                const total = calculateTotal();
                setFormData((prev) => ({
                  ...prev,
                  budget: `₱${total.toLocaleString()}`
                }));
                const formEl = document.getElementById("commission-form");
                if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
              style={{ width: "100%", padding: "0.75rem" }}
            >
              Use This Estimate in Form
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 5-STEP COMMISSION WORKFLOW
          ========================================================================= */}
      <section style={{ marginBottom: "5rem" }}>
        <div style={{ maxWidth: "600px", marginBottom: "2.5rem" }}>
          <span className="font-hand" style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}>
            Transparent collaboration
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem" }}>
            The Commission Process
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {COMMISSION_STEPS.map((step) => (
            <div
              key={step.step}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                padding: "1.5rem",
                position: "relative"
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--lavender-accent)",
                  marginBottom: "0.5rem"
                }}
              >
                {step.step}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                {step.title}
              </h3>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                {step.subtitle}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          COMMISSION REQUEST FORM
          ========================================================================= */}
      <section
        id="commission-form"
        style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          boxShadow: "var(--card-shadow-hover)",
          marginBottom: "5rem"
        }}
      >
        <div style={{ maxWidth: "680px", marginBottom: "2rem" }}>
          <span className="font-hand" style={{ fontSize: "1.3rem", color: "var(--lavender-accent)", display: "block" }}>
            Direct studio inquiry
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.3rem", marginBottom: "0.5rem" }}>
            Commission Request Form
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Fill out the details below. Submitting will open your default email client with your prefilled
            inquiry ready to send to <strong>{ARTIST_INFO.email}</strong>, or you can copy the summary directly to DM me on Instagram/X (@juswa_draws).
          </p>
        </div>

        {submitted && (
          <div
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "6px",
              backgroundColor: "rgba(52, 211, 153, 0.12)",
              border: "1px solid #34D399",
              color: "var(--text-primary)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <CheckCircle size={20} color="#34D399" />
            <div>
              <strong>Inquiry Prepared!</strong> Your email client has been launched. If it didn't open automatically,
              use the "Copy Details" button below to message me directly.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "1.5rem"
            }}
          >
            {/* Client Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Your Name or Preferred Alias *
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="e.g. Robin / @user_oc"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: `1px solid ${formErrors.clientName ? "#EF4444" : "var(--border-color)"}`,
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              />
              {formErrors.clientName && (
                <span style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: "0.25rem", display: "block" }}>
                  {formErrors.clientName}
                </span>
              )}
            </div>

            {/* Contact Method */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Email or Preferred Contact Method *
              </label>
              <input
                type="text"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                placeholder="e.g. robin@gmail.com or @robin_draws on IG"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: `1px solid ${formErrors.contactMethod ? "#EF4444" : "var(--border-color)"}`,
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              />
              {formErrors.contactMethod && (
                <span style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: "0.25rem", display: "block" }}>
                  {formErrors.contactMethod}
                </span>
              )}
            </div>

            {/* Commission Type */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Commission Type
              </label>
              <input
                type="text"
                name="commissionType"
                value={formData.commissionType}
                onChange={handleInputChange}
                placeholder="e.g. Half-Body Sketch (₱300)"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            {/* Budget */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Estimated Budget (PHP or USD)
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g. ₱300 – ₱600"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            {/* Desired Deadline */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Desired Deadline (Optional)
              </label>
              <input
                type="text"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                placeholder="e.g. Within 2 weeks / Flexible"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            {/* Intended Usage */}
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                Intended Usage
              </label>
              <select
                name="intendedUsage"
                value={formData.intendedUsage}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              >
                <option value="Personal (Social media / Avatar / Wallpapers)">Personal (Social media / Avatar / Wallpapers)</option>
                <option value="Commercial (Merchandise / Album Art / VTuber)">Commercial (Merchandise / Album Art / VTuber)</option>
                <option value="Gift for Friend / Loved One">Gift for Friend / Loved One</option>
              </select>
            </div>
          </div>

          {/* Reference Image Links */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
              Reference Image Links (Imgur, Pinterest, Google Drive, Cara)
            </label>
            <input
              type="text"
              name="referenceLinks"
              value={formData.referenceLinks}
              onChange={handleInputChange}
              placeholder="e.g. https://drive.google.com/... or https://pinterest.com/..."
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-main)",
                color: "var(--text-primary)",
                fontSize: "0.9rem"
              }}
            />
          </div>

          {/* Description of Request */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
              Project Description & Character Details *
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your character's personality, expression, pose, hair/eye details, lighting preference, or specific story mood..."
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "4px",
                border: `1px solid ${formErrors.description ? "#EF4444" : "var(--border-color)"}`,
                backgroundColor: "var(--bg-main)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                fontFamily: "var(--font-body)",
                lineHeight: 1.6
              }}
            />
            {formErrors.description && (
              <span style={{ fontSize: "0.78rem", color: "#EF4444", marginTop: "0.25rem", display: "block" }}>
                {formErrors.description}
              </span>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "0.9rem 2rem", fontSize: "0.95rem" }}
            >
              <Send size={16} />
              <span>Send Commission Inquiry</span>
            </button>

            <button
              type="button"
              onClick={copyInquirySummary}
              className="btn-secondary"
              style={{ padding: "0.9rem 1.5rem", fontSize: "0.95rem" }}
            >
              <Copy size={16} />
              <span>{copiedSummary ? "Details Copied to Clipboard!" : "Copy Inquiry for Social DM"}</span>
            </button>

            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Or direct email: <strong>{ARTIST_INFO.email}</strong>
            </span>
          </div>
        </form>
      </section>

      {/* =========================================================================
          PAYMENT AND TERMS OF SERVICE
          ========================================================================= */}
      <section
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: "3.5rem"
        }}
      >
        <div style={{ maxWidth: "600px", marginBottom: "2rem" }}>
          <span className="font-hand" style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}>
            Clear expectations
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
            Terms & Payment Policies
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.5rem"
            }}
          >
            <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Accepted Payment Channels</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
              {COMMISSION_TERMS.paymentMethods.map((pm) => (
                <span
                  key={pm}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "4px",
                    backgroundColor: "var(--bg-subtle)",
                    color: "var(--lavender-accent)"
                  }}
                >
                  {pm}
                </span>
              ))}
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {COMMISSION_TERMS.deposit}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.5rem"
            }}
          >
            <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Revision Policy</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {COMMISSION_TERMS.revisions}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.5rem"
            }}
          >
            <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Usage & Commercial Rights</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {COMMISSION_TERMS.usageRights}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
