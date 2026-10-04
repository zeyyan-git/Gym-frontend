import React from "react";
import Sidebar from "./Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={styles.main}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
      </main>
    </div>
  );
};

const styles = {
  main: {
    flex: 1,
    padding: "36px 40px",
    minHeight: "100vh",
    background: "var(--offwhite)",
  },
};

export default DashboardLayout;
