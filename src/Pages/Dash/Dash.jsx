import React from "react";
import CampaignPanel from "./CampaignPanel";
import DnDNewsPanel from "./DnDNewsPanel";
import SearchBar from "../../Reusable Components/SearchBar";
import "./Dash.css";

const Dash = ({ isGuest = true }) => {
  return (
    <div className="dash">
      <SearchBar placeholder="Search campaigns, characters, items..." />
      <CampaignPanel isGuest={isGuest} />
      <DnDNewsPanel />
    </div>
  );
};

export default Dash;
