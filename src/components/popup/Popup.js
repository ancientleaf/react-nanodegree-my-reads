import React from "react";
import './Popup.css';
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <h1>{props.header}</h1>
        <p>{props.message}</p>
      </div>
    </div>
  );
};
 
export default Popup;