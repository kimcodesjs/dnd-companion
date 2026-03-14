import React from "react";
import { useNavigate } from "react-router-dom";
import "./CampaignPanel.css";

const CampaignPanel = ({ isGuest = false, campaigns = [] }) => {
  const navigate = useNavigate();

  return (
    <div className={`campaign-panel ${isGuest ? "campaign-panel--guest" : ""}`}>

      {isGuest && (
        <div className="campaign-panel-overlay">
          <p className="campaign-panel-overlay-message">
            Active campaigns are a user-only feature.
          </p>
          <button
            className="campaign-panel-overlay-btn"
            onClick={() => navigate("/login", { state: { newUser: true } })}
          >
            Create an Account
          </button>
        </div>
      )}

      <div className="campaign-panel-header">
        <h2 className="campaign-panel-title">Active Campaigns</h2>
        <button
          className="campaign-panel-add"
          disabled={isGuest}
          aria-disabled={isGuest}
        >
          + New Campaign
        </button>
      </div>

      <div className="campaign-panel-cards">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign.id} className="campaign-card">
              <h3 className="campaign-card-title">{campaign.name}</h3>
              <p className="campaign-card-subtitle">{campaign.description}</p>
            </div>
          ))
        ) : (
          <p className="campaign-panel-empty">No active campaigns yet.</p>
        )}
      </div>

    </div>
  );
};

export default CampaignPanel;
