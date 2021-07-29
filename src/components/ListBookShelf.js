import React, { Component } from 'react';
import BookShelf from './BookShelf';
import {SHELVES_CONFIG} from '../config/ShelvesConfig';
import PropTypes from 'prop-types';

class ListBookShelf extends Component {

  render() {
    return (
      SHELVES_CONFIG.shelves.map( shelf => (
        <BookShelf key={shelf.id} books={this.props.books.filter(book => book.shelf === shelf.id)} shelf={shelf} moveBookHandler={this.props.moveBookHandler} />
      ))
    );
  }
}

ListBookShelf.propsType = {
  books: PropTypes.array.isRequired,
  moveBookHandler: PropTypes.func.isRequired
};

export default ListBookShelf;