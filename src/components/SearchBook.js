import React, { Component } from 'react';
import SearchBookResult from './SearchBookResult';
import { search } from './../util/BooksAPI';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBook extends Component {

  state = {
    query: '',
    result: [],
    error: ''
  };


  toggleSearch = () => {
    this.props.toggleSearchPage();
  };

  emptyQuery = () => {
    this.setState({
      result: [],
      query: ''
    });
  }

  onSearchChangeHandler = (event) => {
    const query = event.target.value;

    this.setState({ query: query });
    if (query === '') {
      this.emptyQuery();
      return;
    }

    search(query.trim()).then((books) => {

      if (!books) {
        this.setState({
          error: 'Unable to received response from server',
          result: []
        });
        return;
      }

      if (books.error) {
        this.setState({
          result: [],
          error: books.error === 'empty query' ? 'No matched result found' : books.error
        });
        return;
      }

      this.setState({
        result: books,
        error: ''
      });
    });

  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onSearchChangeHandler} />
          </div>
        </div>
        {this.state.error !== '' && <h1><br /><br /><br />{this.state.error}</h1>}
        <SearchBookResult booksResult={this.state.result} moveBookHandler={this.props.moveBookHandler} savedBooks={this.props.savedBooks} />
      </div>
    )
  }
}

SearchBook.propType = {
  moveBookHandler: PropType.func.isRequired,
  savedBooks: PropType.array.isRequired,
};


export default SearchBook;