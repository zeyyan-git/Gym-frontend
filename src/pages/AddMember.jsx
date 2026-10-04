import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Navbar from "../components/Navbar.jsx";
import MemberForm from "../components/MemberForm.jsx";
import api from "../api/axios.js";

const AddMember = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await api.post("/members", values);
      navigate("/members");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Navbar title="Add Member" subtitle="Register a new member at IronYard Gym" />
      <MemberForm onSubmit={handleSubmit} submitLabel="Add Member" submitting={submitting} />
    </DashboardLayout>
  );
};

export default AddMember;
