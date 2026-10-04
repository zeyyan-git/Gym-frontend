import React from "react";

const Loader = ({ label = "Loading..." }) => (
  <div style={styles.wrap}>
    <div style={styles.spinner} />
    <span style={styles.label}>{label}</span>
    <style>{`
      @keyframes gym-spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "60px 0",
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "4px solid var(--yellow-pale)",
    borderTopColor: "var(--yellow)",
    animation: "gym-spin 0.8s linear infinite",
  },
  label: { color: "var(--charcoal)", fontSize: 13, fontWeight: 600 },
};

export default Loader;
