import React from "react";

const Navbar = ({ title, subtitle }) => {
  return (
    <div style={styles.wrap}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      <div style={styles.accent} />
    </div>
  );
};

const styles = {
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  title: { fontSize: 30 },
  subtitle: { margin: "6px 0 0", color: "var(--charcoal)", fontSize: 14 },
  accent: {
    width: 64,
    height: 6,
    borderRadius: 4,
    background: "linear-gradient(90deg, var(--yellow), var(--yellow-dark))",
  },
};

export default Navbar;
