import React from "react";
import CampaignPanel from "./CampaignPanel";
import "./Dash.css";

const Dash = ({ isGuest = true }) => {
  return (
    <div className="dash">
<CampaignPanel isGuest={isGuest} />
    </div>
  );
};

export default Dash;
