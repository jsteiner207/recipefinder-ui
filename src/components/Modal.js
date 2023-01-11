import React from "react";
import AddRecipeForm from "./AddRecipeForm";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "5%",
  left: "25%",
  Transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#b6f6fb",
  zIndex: 1000,
};

function Modal({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
    <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <AddRecipeForm onClose={onClose} />
      </div>
    </>, document.getElementById('portal')
  );
}

export default Modal;
