import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/BackIcon";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  return createPortal(
    <button
      className="back-button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <BackIcon size={20} />
    </button>,
    document.body
  );
};

export default BackButton;
