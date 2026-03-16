import React from "react";
import { useNavigate } from "react-router-dom";
import CampaignPanel from "./CampaignPanel";
import DnDNewsPanel from "./DnDNewsPanel";
import SearchBar from "../../Reusable Components/SearchBar";
import SwordIcon from "../../assets/SwordIcon";
import "./Dash.css";

const Dash = ({ isGuest = true }) => {
  const navigate = useNavigate();

  return (
    <div className="dash">
      <div className="dash-search-row">
        <SearchBar placeholder="Search campaigns, characters, items..." />
        <button
          className="dash-explore-btn"
          onClick={() => navigate("/explore")}
          aria-label="Explore 5e"
        >
          <SwordIcon size={18} />
          <span className="dash-explore-label">Explore 5e</span>
        </button>
      </div>
      <CampaignPanel isGuest={isGuest} />
      <DnDNewsPanel />
    </div>
  );
};

export default Dash;
