import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {

  /**
  * @description Move book to different shelve using props.moveBookHandler
  * @param {object} moveBook Book to be moved
  * @param {string} toShelf Shelf Id to move the book to
  */
  moveBookHandlerToOtherShelf = (book, moveTo) => {
    this.props.moveBookHandler(book, moveTo);
  };

  render() {
    const { shelf, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} moveBookHandler={this.moveBookHandlerToOtherShelf} currentShelve={shelf.id}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  moveBookHandler: PropTypes.func.isRequired
};

export default BookShelf;