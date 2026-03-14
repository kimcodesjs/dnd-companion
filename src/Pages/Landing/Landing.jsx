import React from "react";
import { useNavigate } from "react-router-dom";
import D20 from "../../Reusable Components/D20";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>DnD DM Companion</h1>
      <h2>track combat, inventory, and more</h2>

      <D20 />

      <button className="landing-get-started" onClick={() => navigate("/login")}>Get Started</button>
    </div>
  );
};

export default Landing;
