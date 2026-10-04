import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdEdit, MdArrowBack, MdPhone, MdWc, MdAttachMoney, MdEvent, MdReceiptLong, MdBadge } from "react-icons/md";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axios.js";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await api.get(`/members/${id}`);
        setMember(data);
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Failed to load member");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  return (
    <DashboardLayout>
      <Navbar title="Member Details" subtitle="Complete profile and fee status" />

      {loading ? (
        <Loader label="Loading member..." />
      ) : errMsg ? (
        <div style={styles.errorBox}>{errMsg}</div>
      ) : (
        <>
          <Link to="/members" style={styles.backLink}>
            <MdArrowBack /> Back to all members
          </Link>

          <div style={styles.card}>
            <div style={styles.header}>
              <div style={styles.avatar}>{member.fullName?.[0]?.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <h2 style={styles.name}>{member.fullName}</h2>
                <div style={styles.badgeRow}>
                  <span style={styles.idBadge}>{member.memberId}</span>
                  <span style={member.feeStatus === "Overdue" ? styles.badgeOverdue : styles.badgePaid}>
                    Fee {member.feeStatus}
                  </span>
                </div>
              </div>
              <button style={styles.editBtn} onClick={() => navigate(`/members/${id}/edit`)}>
                <MdEdit size={16} /> Edit
              </button>
            </div>

            <div style={styles.grid}>
              <Detail icon={MdBadge} label="Member ID" value={member.memberId} />
              <Detail icon={MdPhone} label="Phone Number" value={member.phone} />
              <Detail icon={MdWc} label="Gender" value={member.gender} />
              <Detail icon={MdAttachMoney} label="Monthly Fee" value={`Rs. ${member.monthlyFee}`} />
              <Detail icon={MdReceiptLong} label="Fee Submission Date" value={formatDate(member.feeSubmissionDate)} />
              <Detail icon={MdEvent} label="Next Due Date" value={formatDate(member.nextDueDate)} />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

const Detail = ({ icon: Icon, label, value, span }) => (
  <div style={{ ...styles.detailItem, gridColumn: span ? `span ${span}` : undefined }}>
    <div style={styles.detailIcon}>
      <Icon size={18} />
    </div>
    <div>
      <div style={styles.detailLabel}>{label}</div>
      <div style={styles.detailValue}>{value}</div>
    </div>
  </div>
);

const styles = {
  backLink: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--charcoal)", marginBottom: 18 },
  card: {
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    padding: 28,
    boxShadow: "var(--shadow-sm)",
  },
  header: { display: "flex", alignItems: "center", gap: 18, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid var(--line)" },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "var(--yellow)",
    color: "var(--black)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 24,
    flexShrink: 0,
  },
  name: { fontSize: 22, margin: "0 0 8px", textTransform: "none", fontFamily: "var(--font-body)", fontWeight: 800 },
  badgeRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  idBadge: {
    background: "var(--yellow)",
    color: "var(--black)",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: 12,
    fontWeight: 800,
  },
  badgePaid: { background: "#e8f7ee", color: "var(--green)", padding: "4px 12px", borderRadius: "999px", fontSize: 12, fontWeight: 700 },
  badgeOverdue: { background: "var(--red)", color: "var(--white)", padding: "4px 12px", borderRadius: "999px", fontSize: 12, fontWeight: 700 },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "var(--black)",
    color: "var(--yellow)",
    border: "none",
    borderRadius: "999px",
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 13,
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 22 },
  detailItem: { display: "flex", gap: 12, alignItems: "flex-start" },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: "var(--radius-sm)",
    background: "var(--yellow-pale)",
    color: "var(--yellow-dark)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  detailLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--charcoal)", fontWeight: 700 },
  detailValue: { fontSize: 14.5, fontWeight: 600, marginTop: 3 },
  errorBox: { background: "var(--red-pale)", color: "var(--red)", padding: "14px 18px", borderRadius: "var(--radius-md)", fontWeight: 600 },
};

export default MemberDetails;
