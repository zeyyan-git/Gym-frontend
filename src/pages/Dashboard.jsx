import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdGroups,
  MdCheckCircle,
  MdWarningAmber,
  MdArrowForward,
  MdPersonAdd,
  MdPeople,
  MdTrendingUp,
  MdCalendarToday,
} from "react-icons/md";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axios.js";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/members/stats/summary");
        setStats(data);
      } catch (err) {
        setErrMsg(
          err.response?.data?.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cards = [
    {
      title: "Total Members",
      value: stats?.totalMembers || 0,
      icon: MdGroups,
      color: "#f4c430",
      bg: "#fff8d8",
    },
    {
      title: "Active Members",
      value: stats?.activeMembers || 0,
      icon: MdCheckCircle,
      color: "#16a34a",
      bg: "#ecfdf3",
    },
    {
      title: "Fee Due",
      value: stats?.feeDueMembers || 0,
      icon: MdWarningAmber,
      color: "#dc2626",
      bg: "#fef2f2",
    },
  ];

  return (
    <DashboardLayout>
      <Navbar
        title="Dashboard"
        subtitle="Gym Management Overview"
      />

      {loading ? (
        <Loader label="Loading dashboard..." />
      ) : errMsg ? (
        <div style={styles.error}>{errMsg}</div>
      ) : (
        <>
          {/* Welcome */}
          <div style={styles.hero}>
            <div>
              <h2 style={styles.heroTitle}>Welcome Back 👋</h2>
              <p style={styles.heroText}>
                Manage members, monitor fee status and keep your gym records
                organized from one place.
              </p>
            </div>

            <div style={styles.dateBox}>
              <MdCalendarToday size={18} />
              {today}
            </div>
          </div>

          {/* Cards */}
          <div style={styles.grid}>
            {cards.map((card) => (
              <div key={card.title} style={styles.card}>
                <div
                  style={{
                    ...styles.icon,
                    background: card.bg,
                    color: card.color,
                  }}
                >
                  <card.icon size={28} />
                </div>

                <div>
                  <h2 style={styles.number}>{card.value}</h2>
                  <p style={styles.label}>{card.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Actions</h3>

            <div style={styles.actions}>
              <Link to="/members/add" style={styles.primaryBtn}>
                <MdPersonAdd size={20} />
                Add Member
              </Link>

              <Link to="/members" style={styles.secondaryBtn}>
                <MdPeople size={20} />
                View Members
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div style={styles.summary}>
            <div style={styles.summaryCard}>
              <MdTrendingUp size={26} color="#f4c430" />
              <div>
                <h4 style={styles.summaryTitle}>Membership Status</h4>
                <p style={styles.summaryText}>
                  {stats.activeMembers} active members out of{" "}
                  {stats.totalMembers}.
                </p>
              </div>
            </div>

            <div style={styles.summaryCard}>
              <MdWarningAmber size={26} color="#dc2626" />
              <div>
                <h4 style={styles.summaryTitle}>Pending Fees</h4>
                <p style={styles.summaryText}>
                  {stats.feeDueMembers} members require fee submission.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

const styles = {
  hero: {
    background: "linear-gradient(135deg,#ffd84d,#ffef9a)",
    borderRadius: 18,
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 30,
  },

  heroTitle: {
    margin: 0,
    fontSize: 30,
    fontWeight: 800,
  },

  heroText: {
    marginTop: 10,
    color: "#333",
    maxWidth: 520,
    lineHeight: 1.6,
    fontSize: 15,
  },

  dateBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    padding: "12px 18px",
    borderRadius: 10,
    fontWeight: 600,
    marginTop: 15,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 20,
    marginBottom: 35,
  },

  card: {
    background: "#fff",
    borderRadius: 18,
    padding: 25,
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  },

  icon: {
    width: 65,
    height: 65,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  number: {
    margin: 0,
    fontSize: 34,
    fontWeight: 800,
  },

  label: {
    marginTop: 6,
    color: "#666",
    fontWeight: 600,
  },

  section: {
    background: "#fff",
    borderRadius: 18,
    padding: 25,
    marginBottom: 25,
    boxShadow: "0 8px 20px rgba(0,0,0,.06)",
  },

  heading: {
    marginTop: 0,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 700,
  },

  actions: {
    display: "flex",
    gap: 18,
    flexWrap: "wrap",
  },

  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 24px",
    background: "#f4c430",
    color: "#000",
    borderRadius: 10,
    fontWeight: 700,
  },

  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 24px",
    border: "2px solid #ddd",
    borderRadius: 10,
    color: "#222",
    fontWeight: 700,
    background: "#fff",
  },

  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: 20,
  },

  summaryCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 22,
    display: "flex",
    gap: 15,
    alignItems: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,.06)",
  },

  summaryTitle: {
    margin: 0,
    fontWeight: 700,
  },

  summaryText: {
    marginTop: 6,
    color: "#666",
    lineHeight: 1.5,
  },

  error: {
    background: "#fdecec",
    color: "#d11a2a",
    padding: 15,
    borderRadius: 10,
    fontWeight: 600,
  },
};

export default Dashboard;