/**
 * Referenced https://www.cluemediator.com/create-simple-popup-in-reactjs
 * for displaying Pop Up Box when user add a new book to shelf 
 */

import React from "react";
import './PopUp.css';
import PropTypes from 'prop-types';

const PopUp = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.closePopUpHandler}>X</span>
        <h1>{props.header}</h1>
        <p>{props.message}</p>
      </div>
    </div>
  )
};

PopUp.propTypes = {
  closePopUpHandler: PropTypes.func.isRequired
};

export default PopUp;