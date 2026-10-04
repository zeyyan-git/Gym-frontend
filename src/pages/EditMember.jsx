import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import MemberForm from "../components/MemberForm.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axios.js";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await api.put(`/members/${id}`, values);
      navigate(`/members/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Navbar title="Edit Member" subtitle="Update member information and fee submission date" />
      {loading ? (
        <Loader label="Loading member..." />
      ) : errMsg ? (
        <div style={{ background: "var(--red-pale)", color: "var(--red)", padding: "14px 18px", borderRadius: "var(--radius-md)", fontWeight: 600 }}>
          {errMsg}
        </div>
      ) : (
        <MemberForm initialValues={member} onSubmit={handleSubmit} submitLabel="Save Changes" submitting={submitting} />
      )}
    </DashboardLayout>
  );
};

export default EditMember;
