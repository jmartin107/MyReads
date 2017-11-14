import React, {Component} from 'react';
import './App.css'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {debounce} from 'throttle-debounce';
import Book from './Book'
import * as BooksAPI from './BooksAPI'

/**
 * Component to Search the Books
 */
class Search extends Component {

    constructor() {
        super();
        this.doSearch = debounce(500, this.doSearch);
    }

    state = {
        query: '',
        searchbooks: []
    };

    /**
     * Updates the Search input field text.
     * @param {String} query The value entered in the Search field.
     */
    updateQuery = (query) => {
        this.setState({query: query.trim()});
        this.doSearch(query.trim())
    };


    /**
     * Queries the server for books meeting the search criteria.
     * @param {String} value The search value.
     */
    doSearch(value) {
        if (value && value.length > 0) {
            BooksAPI.search(value, 20).then((searchbooks) => {
                if (searchbooks.error) {
                    searchbooks = [];
                }
                this.setState({searchbooks})
            })
        }
    }

    /**
     * Adds the shelf category to the returned books.
     * @param searchBook
     */
    getBookShelf = (searchBook) => {
        if (this.props.books[searchBook.id]) {
            searchBook.shelf = this.props.books[searchBook.id].shelf
        } else {
            searchBook.shelf = 'none'
        }
    };

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired
    };

    render() {

        let booksWithState = this.state.searchbooks.map((searchBook) => {
            this.getBookShelf(searchBook);
            return searchBook;
        });


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksWithState.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                onUpdate={this.props.onUpdate}
                            />
                        ))}

                    </ol>
                </div>
            </div>
        )

    }

}


export default Search