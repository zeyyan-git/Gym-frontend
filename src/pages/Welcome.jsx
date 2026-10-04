import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gymLogo from "../assets/gym.png";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-screen">
      <div className="welcome-slash" />

      <div className="welcome-content">
        <img src={gymLogo} alt="My Fitness Gym logo" className="welcome-logo" />
        <h1 className="welcome-title font-display">
          My Fitness Gym
          
        </h1>
        <p className="welcome-tagline">Gym Management System</p>

        <div className="barbell-loader" aria-hidden="true">
          <div className="plate lg" />
          <div className="plate md" />
          <div className="bar-track">
            <div className="bar-fill" />
          </div>
          <div className="plate md" />
          <div className="plate lg" />
        </div>

        {showButton && (
          <button className="welcome-enter-btn" style={styles.enterBtn} onClick={() => navigate("/login")}>
          LOGIN →
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  enterBtn: {
    background: "var(--black)",
    color: "var(--yellow)",
    border: "none",
    padding: "14px 32px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.03em",
    boxShadow: "var(--shadow-md)",
  },
};

export default Welcome;
