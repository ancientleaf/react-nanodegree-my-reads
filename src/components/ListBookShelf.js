import React, { Component } from 'react';
import BookShelf from './BookShelf';
import {SHELVES_CONFIG} from '../config/ShelvesConfig';

class ListBookShelf extends Component {

  render() {
    return (
      SHELVES_CONFIG.shelves.map( shelf => (
        <BookShelf key={shelf.id} books={this.props.books.filter(book => book.shelf === shelf.id)} shelf={shelf} moveBookHandler={this.props.moveBookHandler} />
      ))
    )
  }
}

export default ListBookShelf;