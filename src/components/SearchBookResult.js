import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import Popup from './popup/Popup';
import { SHELVES_CONFIG } from '../config/ShelvesConfig';

class SearchBookResult extends Component {

  state = {
    isPopUpOpen: false,
    popUpBox: {
      header: '',
      message: ''
    }
  };

  getSavedBook = (book) => {
    return ;
  };

  moveBookHandler = (book, moveTo,) => {
    this.props.moveBookHandler(book, moveTo);
    let shelf = SHELVES_CONFIG.shelves.find( shelf => shelf.id === moveTo);
    let popUpBoxMsg = shelf ? {
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

  getUpdatedBookShelfId = (resultBook) => {
    let savedBook = this.props.savedBooks.find(book => book.id === resultBook.id);
    return !savedBook ?  'none' : savedBook.shelf; 
  };

  togglePopUp = () =>{
    this.setState((curr_state) => ({
      isPopUpOpen: !curr_state.isPopUpOpen
    }));
  };

  render() {
    return (
      <div className="search-books-results">
        {
          this.state.isPopUpOpen && <Popup
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