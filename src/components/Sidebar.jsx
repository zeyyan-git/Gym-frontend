import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdGroups,
  MdPersonAddAlt1,
  MdLogout,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext.jsx";
import gymLogo from "../assets/gym.png";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
  { to: "/members", label: "All Members", icon: MdGroups },
  { to: "/members/add", label: "Add Member", icon: MdPersonAddAlt1 },
];

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <img src={gymLogo} alt="My Fitness Gym logo" style={styles.logo} />
        <div>
          <h2 style={styles.brandTitle}>My Fitness</h2>
          <span style={styles.brandSub}>Gym Management</span>
        </div>
      </div>

      <nav style={styles.nav}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.linkActive : {}),
            })}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.adminBadge}>
          <div style={styles.avatar}>{admin?.name?.[0]?.toUpperCase() || "A"}</div>
          <div style={{ overflow: "hidden" }}>
            <div style={styles.adminName}>{admin?.name || "Admin"}</div>
            <div style={styles.adminEmail}>{admin?.email}</div>
          </div>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <MdLogout size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: 256,
    minHeight: "100vh",
    background: "var(--white)",
    borderRight: "1px solid var(--line)",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "24px 20px",
    borderBottom: "1px solid var(--line)",
  },
  logo: { width: 60, height: 70, borderRadius: "50%" },
  brandTitle: { fontSize: 18, letterSpacing: "0.04em" },
  brandSub: { fontSize: 11, color: "var(--charcoal)", textTransform: "uppercase" },
  nav: { display: "flex", flexDirection: "column", gap: 4, padding: "20px 14px", flex: 1 },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: "var(--radius-md)",
    color: "var(--charcoal)",
    fontWeight: 600,
    fontSize: 14,
    transition: "background 0.15s ease, color 0.15s ease",
  },
  linkActive: {
    background: "var(--yellow)",
    color: "var(--black)",
  },
  footer: {
    padding: 16,
    borderTop: "1px solid var(--line)",
  },
  adminBadge: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "var(--black)",
    color: "var(--yellow)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    flexShrink: 0,
  },
  adminName: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  adminEmail: { fontSize: 11, color: "var(--charcoal)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  logoutBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 12px",
    border: "1.5px solid var(--black)",
    borderRadius: "var(--radius-md)",
    background: "var(--white)",
    color: "var(--black)",
    fontWeight: 700,
    fontSize: 13,
  },
};

export default Sidebar;
