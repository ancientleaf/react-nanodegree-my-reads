import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import PopUp from './PopUp/PopUp';
import { SHELVES_CONFIG } from '../config/ShelvesConfig';

class SearchBookResult extends Component {

  state = {
    isPopUpOpen: false,
    popUpBox: {
      header: '',
      message: ''
    }
  };

  /**
  * @description Move book to different shelve. 
  *               Uses props.moveBookHandler to move book.
  *               Toggles pop up message when book is moved successfully.
  * @param {object} moveBook Book to be moved
  * @param {string} toShelf Shelf Id to move the book to
  */
  moveBookHandler = (book, moveTo) => {
    this.props.moveBookHandler(book, moveTo);
    const shelf = SHELVES_CONFIG.shelves.find( shelf => shelf.id === moveTo);
    const popUpBoxMsg = shelf ? {
      header: 'Added book to list!',
      message: `Moved '${book.title}' to ${shelf.title} shelf.`
    } : {
      header: 'Removed book from list!',
      message: `Removed '${book.title}' as you have selected '${moveTo}' option.`
    };

    this.setState((curr_state) => ({
      isPopUpOpen: !curr_state.isPopUpOpen,
      popUpBox: popUpBoxMsg
    }));
  };

  /**
  * @description Get up to date Shelf Id for a Book Shelf Changer
  *               If the book is belong to any shelf, return the shelf id to None.
  *               Else return the shelve id where the book is belong to
  * @param {object} resultBook Book to be returned up to date shelf id
  * @retruns {string} Shelf Id of the book to be displayed in Book Shelf Changer
  */
  getUpdatedBookShelfId = (resultBook) => {
    const savedBook = this.props.savedBooks.find(book => book.id === resultBook.id);
    return !savedBook ?  'none' : savedBook.shelf; 
  };

  /**
  * @description Toggles Pop Up box to be displayed to user.
  */
  togglePopUp = () =>{
    this.setState((curr_state) => ({
      isPopUpOpen: !curr_state.isPopUpOpen
    }));
  };

  render() {
    return (
      <div className="search-books-results">
        {
          this.state.isPopUpOpen && <PopUp
            handleClose={this.togglePopUp}
            header={this.state.popUpBox.header}
            message={this.state.popUpBox.message}
          />
        }
        <ol className="books-grid">
          {this.props.booksResult.map((book) => (
            <Book key={book.id} book={book} moveBookHandler={this.moveBookHandler} currentShelve={this.getUpdatedBookShelfId(book)} />
          ))}
        </ol>

      </div>
    )
  }
}

SearchBookResult.propTypes = {
  booksResult: PropTypes.array.isRequired,
  savedBooks: PropTypes.array.isRequired,
  moveBookHandler: PropTypes.func.isRequired
};

export default SearchBookResult;