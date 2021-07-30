import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import imageNotFound from './../icons/image-not-found.png';

class Book extends Component {

  /**
  * @description Move current book in props to different shelve 
  * @param {string} toShelf Shelf Id to move the book to
  */
  moveBookHandler = (moveTo) => {
    this.props.moveBookHandler(this.props.book, moveTo)
  };

  /**
  * @description Check if the Thumbnail iss missing from book object 
  * @param {object} book Book to be checked for Thumnail existence
  * @returns {boolean} Returns True if Thumbnail is missing, False is Thumbnail exist 
  */
  isThumbnailMissing = (book) => {
    return !book.imageLinks || !book.imageLinks.thumbnail
  };

  render() {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
                style={
                  {
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${this.isThumbnailMissing(book) ? imageNotFound : book.imageLinks.thumbnail})`,
                    backgroundSize: this.isThumbnailMissing(book) ? `100% 100%` : 'auto'
                  }
                }></div>
            <BookShelfChanger bookShelfChangerHandler={this.moveBookHandler} currentShelve={this.props.currentShelve} />
            </div>
            <div className="book-title">{book.title}</div>
            {
              book.authors && book.authors.map(author => (
                <div key={author} className="book-authors">{author}</div>
              ))
            }
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  currentShelve: PropTypes.string.isRequired,
  moveBookHandler: PropTypes.func.isRequired
};

export default Book;