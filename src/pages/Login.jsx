import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdFitnessCenter } from "react-icons/md";
import { useAuth } from "../context/AuthContext.jsx";
import gymLogo from "../assets/gym.png";
import { BiFontFamily } from "react-icons/bi";

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.slashTop} />

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img src={gymLogo} alt="My Fitness Gym logo" style={styles.logo} />
        </div>
        <h1 style={styles.title} className="font-display">
          My Fitness Gym
        </h1>
        <p style={styles.subtitle}>Sign in to manage My Fitness Gym</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <span style={styles.labelText}>Email</span>
            <div style={styles.inputWrap}>
              <MdEmail size={18} color="var(--charcoal)" />
              <input
                type="email"
                required
                placeholder="myfitnessgym@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
          </label>

          <label style={styles.label}>
            <span style={styles.labelText}>Password</span>
            <div style={styles.inputWrap}>
              <MdLock size={18} color="var(--charcoal)" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            <MdFitnessCenter size={18} />
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--white)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: 20,
  },
  slashTop: {
    position: "absolute",
    top: -160,
    right: -160,
    width: 420,
    height: 420,
    background: "var(--yellow)",
    borderRadius: "50%",
    opacity: 0.9,
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 400,
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    padding: "36px 32px",
    textAlign: "center",
  },
  logoWrap: { display: "flex", justifyContent: "center", marginBottom: 16 },
  logo: { width:130, height: 140 },
title: {
  fontSize: 26,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: "bold",
},
  subtitle: { color: "var(--charcoal)", fontSize: 13, margin: "8px 0 26px" },
  form: { display: "flex", flexDirection: "column", gap: 16, textAlign: "left" },
  label: { display: "flex", flexDirection: "column", gap: 6 },
  labelText: { fontSize: 12, fontWeight: 700, color: "var(--black)", textTransform: "uppercase", letterSpacing: "0.04em" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1.5px solid var(--line)",
    borderRadius: "var(--radius-md)",
    padding: "12px 14px",
    background: "var(--offwhite)",
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: 14,
    color: "var(--black)",
  },
  error: {
    background: "var(--red-pale)",
    color: "var(--red)",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 12px",
    borderRadius: "var(--radius-sm)",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "var(--yellow)",
    color: "var(--black)",
    border: "none",
    borderRadius: "999px",
    padding: "13px 20px",
    fontWeight: 800,
    fontSize: 14,
    letterSpacing: "0.02em",
    marginTop: 4,
    boxShadow: "var(--shadow-yellow)",
  },
};

export default Login;
