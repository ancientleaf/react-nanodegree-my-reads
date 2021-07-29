import React from "react";
import './PopUp.css';
import PropTypes from 'prop-types';

const PopUp = props => {
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

PopUp.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default PopUp;