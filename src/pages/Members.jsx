import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSearch, MdEdit, MdDelete, MdVisibility, MdPersonAddAlt1 } from "react-icons/md";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axios.js";

const Members = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchMembers = async (searchTerm = "") => {
    setLoading(true);
    try {
      const { data } = await api.get("/members", { params: searchTerm ? { search: searchTerm } : {} });
      setMembers(data);
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => fetchMembers(search), 350);
    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the member list? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/members/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete member");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <DashboardLayout>
      <Navbar title="All Members" subtitle={`${members.length} member${members.length !== 1 ? "s" : ""} registered`} />

      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <MdSearch size={18} color="var(--charcoal)" />
          <input
            type="text"
            placeholder="Search by name, phone, or member ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <Link to="/members/add" style={styles.addBtn}>
          <MdPersonAddAlt1 size={18} /> Add Member
        </Link>
      </div>

      {loading ? (
        <Loader label="Loading members..." />
      ) : errMsg ? (
        <div style={styles.errorBox}>{errMsg}</div>
      ) : members.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyTitle}>No members found</p>
          <p style={styles.emptyText}>Try a different search, or add your first member to get started.</p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Member ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>Monthly Fee</th>
                <th style={styles.th}>Fee Submission Date</th>
                <th style={styles.th}>Fee Status</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const overdue = m.feeStatus === "Overdue";
                return (
                  <tr key={m._id} style={overdue ? styles.rowOverdue : styles.row}>
                    <td style={styles.td}>
                      <span style={styles.idCell}>{m.memberId}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.nameCell} onClick={() => navigate(`/members/${m._id}`)}>
                        {m.fullName}
                      </span>
                    </td>
                    <td style={styles.td}>{m.phone}</td>
                    <td style={styles.td}>{m.gender}</td>
                    <td style={styles.td}>Rs. {m.monthlyFee}</td>
                    <td style={styles.td}>{formatDate(m.feeSubmissionDate)}</td>
                    <td style={styles.td}>
                      <span style={overdue ? styles.badgeOverdue : styles.badgePaid}>{m.feeStatus}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <div style={styles.actions}>
                        <button style={styles.iconBtn} title="View" onClick={() => navigate(`/members/${m._id}`)}>
                          <MdVisibility size={17} />
                        </button>
                        <button style={styles.iconBtn} title="Edit" onClick={() => navigate(`/members/${m._id}/edit`)}>
                          <MdEdit size={17} />
                        </button>
                        <button
                          style={{ ...styles.iconBtn, ...styles.iconBtnDanger }}
                          title="Delete"
                          disabled={deletingId === m._id}
                          onClick={() => handleDelete(m._id, m.fullName)}
                        >
                          <MdDelete size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

const styles = {
  toolbar: { display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22, justifyContent: "space-between" },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--white)",
    border: "1.5px solid var(--line)",
    borderRadius: "999px",
    padding: "10px 16px",
    flex: 1,
    minWidth: 240,
    maxWidth: 420,
  },
  searchInput: { border: "none", outline: "none", background: "transparent", width: "100%", fontSize: 14 },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--yellow)",
    color: "var(--black)",
    padding: "11px 20px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: 13,
  },
  tableWrap: {
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--charcoal)",
    padding: "14px 18px",
    background: "var(--offwhite)",
    borderBottom: "1px solid var(--line)",
  },
  row: { borderBottom: "1px solid var(--line)" },
  rowOverdue: { borderBottom: "1px solid var(--line)", background: "var(--red-pale)" },
  td: { padding: "14px 18px", fontSize: 13.5, color: "var(--black)" },
  nameCell: { fontWeight: 700, cursor: "pointer" },
  idCell: {
    fontWeight: 800,
    fontSize: 12,
    background: "var(--yellow-pale)",
    color: "var(--yellow-dark)",
    padding: "4px 9px",
    borderRadius: "999px",
  },
  badgePaid: {
    background: "#e8f7ee",
    color: "var(--green)",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: 11,
    fontWeight: 700,
  },
  badgeOverdue: {
    background: "var(--red)",
    color: "var(--white)",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: 11,
    fontWeight: 700,
  },
  actions: { display: "flex", gap: 6, justifyContent: "flex-end" },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--line)",
    background: "var(--white)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--black)",
  },
  iconBtnDanger: { color: "var(--red)" },
  emptyState: { textAlign: "center", padding: "60px 20px", background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--line)" },
  emptyTitle: { fontWeight: 800, fontSize: 16, margin: 0 },
  emptyText: { color: "var(--charcoal)", fontSize: 13, marginTop: 6 },
  errorBox: { background: "var(--red-pale)", color: "var(--red)", padding: "14px 18px", borderRadius: "var(--radius-md)", fontWeight: 600 },
};

export default Members;
