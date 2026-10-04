import React, { useState } from "react";

const GENDERS = ["Male", "Female", "Other"];

const toDateInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
};

const MemberForm = ({ initialValues, onSubmit, submitLabel = "Save Member", submitting }) => {
  const [form, setForm] = useState({
    fullName: initialValues?.fullName || "",
    phone: initialValues?.phone || "",
    gender: initialValues?.gender || "Male",
    monthlyFee: initialValues?.monthlyFee || "",
    feeSubmissionDate: toDateInput(initialValues?.feeSubmissionDate) || toDateInput(new Date()),
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit({
        ...form,
        monthlyFee: Number(form.monthlyFee),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please check the form and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}

      {initialValues?.memberId && (
        <div style={styles.idBadgeWrap}>
          <span style={styles.idBadgeLabel}>Member ID</span>
          <span style={styles.idBadge}>{initialValues.memberId}</span>
        </div>
      )}

      <div style={styles.grid}>
        <Field label="Full Name" span={2}>
          <input name="fullName" required value={form.fullName} onChange={handleChange} style={styles.input} placeholder="e.g. Ali Raza" />
        </Field>

        <Field label="Phone Number">
          <input name="phone" required value={form.phone} onChange={handleChange} style={styles.input} placeholder="03xx-xxxxxxx" />
        </Field>

        <Field label="Gender">
          <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="Monthly Fee (Rs.)">
          <input name="monthlyFee" type="number" min="0" required value={form.monthlyFee} onChange={handleChange} style={styles.input} placeholder="e.g. 3000" />
        </Field>

        <Field label="Fee Submission Date">
          <input name="feeSubmissionDate" type="date" required value={form.feeSubmissionDate} onChange={handleChange} style={styles.input} />
        </Field>
      </div>

      <button type="submit" disabled={submitting} style={styles.submitBtn}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

const Field = ({ label, children, span }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: span ? `span ${span}` : undefined }}>
    <span style={styles.labelText}>{label}</span>
    {children}
  </label>
);

const styles = {
  form: {
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    padding: 28,
    boxShadow: "var(--shadow-sm)",
  },
  idBadgeWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
    paddingBottom: 20,
    borderBottom: "1px solid var(--line)",
  },
  idBadgeLabel: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--charcoal)" },
  idBadge: {
    background: "var(--yellow)",
    color: "var(--black)",
    padding: "5px 14px",
    borderRadius: "999px",
    fontWeight: 800,
    fontSize: 13,
    letterSpacing: "0.03em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 18,
    marginBottom: 24,
  },
  labelText: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--black)" },
  input: {
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-md)",
    padding: "11px 14px",
    fontSize: 14,
    background: "var(--offwhite)",
    color: "var(--black)",
    outline: "none",
  },
  submitBtn: {
    background: "var(--yellow)",
    color: "var(--black)",
    border: "none",
    borderRadius: "999px",
    padding: "13px 28px",
    fontWeight: 800,
    fontSize: 14,
    boxShadow: "var(--shadow-yellow)",
  },
  error: {
    background: "var(--red-pale)",
    color: "var(--red)",
    padding: "12px 16px",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: 13,
    marginBottom: 18,
  },
};

export default MemberForm;
