import React, { Component } from "react";
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {

  /**
  * @description Handler function to detect onChange event on 
  *               select element to move book to different shelve
  * @param {event} event Event of the onChange used to extract 
  *                 target of newly selected shelf
  */
  bookShelfChangerHandler = (event) => {
    const selected = event.target.value;
    if (selected !== "move") {
      this.props.bookShelfChangerHandler(event.target.value);
    }
  };

  render() {
    return (
      <div className="book-shelf-changer" >
        <select onChange={this.bookShelfChangerHandler} value={this.props.currentShelve}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading" >Currently Reading</option>
          <option value="wantToRead" >Want to Read</option>
          <option value="read" >Read</option>
          <option value="none" >None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propsType = {
  bookShelfChangerHandler: PropTypes.func.isRequired,
  currentShelve: PropTypes.string.isRequired
};

export default BookShelfChanger;