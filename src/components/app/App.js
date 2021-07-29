import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import ListBookShelf from '../ListBookShelf';
import SearchBook from '../SearchBook';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './../../util/BooksAPI';

class BooksApp extends React.Component {

  state = {
    savedBooks: []
  };

  moveBookHandler = (moveBook, toShelf) => {
    BooksAPI.update(moveBook, toShelf).then( res => {
      moveBook.shelf=toShelf;
      this.setState( prev_state => ({
        savedBooks: [...prev_state.savedBooks.filter(book => { return book.id !== moveBook.id}), moveBook]
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => { 
      this.setState({ savedBooks: books })
    });
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path='/search'  render={() => (
            <SearchBook 
              moveBookHandler={this.moveBookHandler}
              savedBooks={this.state.savedBooks}/>
          )}/>
        <Route
          exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ListBookShelf 
                books={this.state.savedBooks} 
                moveBookHandler={this.moveBookHandler}/>
              <div className="open-search">
                <Link 
                  to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
