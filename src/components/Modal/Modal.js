import React from "react";
import "./modal.scss";

function Modal({ title, children, onClose, onSubmit, submitText }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="body">{children}</div>
        <div className="footer">
          <button className="submitButton" onClick={onSubmit}>
            {submitText}
          </button>
          <button className="cancelButton" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
