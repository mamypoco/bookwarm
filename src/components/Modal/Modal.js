import React from "react";
import "./modal.scss";
import closeButton from "../../assets/icons/cross.png";

function Modal({ title, children, onClose, onSubmit, submitText }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={onClose}>
          <img
            type="button"
            src={closeButton}
            alt="close button"
            className="closeButtonImage"
          />
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
