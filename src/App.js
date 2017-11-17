import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Search from './Search'
import BookShelf from './BookShelf'
import {Route} from 'react-router-dom'

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class App extends Component {

    state = {
        books: []
    };

    /**
     * Retrieves the list of books when the app starts.
     */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    /**
     * Assigns the book to the provided shelf. Calls the BooksAPI to update
     * the shelf on the server.
     *
     * @param {Object} book The book to update
     * @param {String} shelf The shelf to assign the book to.
     * One of the following categories: currentlyReading, wantToRead, read or none.
     */
    updateBook = (book, shelf) => {
        // Convert the books state array to an object indexed by book ids. This is done
        // to make accessing the book from the list more efficient.
        let booksObject = this.booksArrayToObject(this.state.books);

        // Add the book if it is not on a shelf
        if (!booksObject[book.id]) {
            booksObject[book.id] = book;
        }

        // Remove the book if shelf category is 'none'.
        if (shelf === 'none') {
            delete booksObject[book.id];
        }

        // Update the book shelf
        BooksAPI.update(book, shelf).then((result) => {
            for (let p in result) {
                if (result.hasOwnProperty(p)) {
                    this.updateBookShelf(p, result[p], booksObject)
                }
            }
            let booksArray = this.booksObjectToArray(booksObject);
            this.setState({books: booksArray})
        })
    };

    /**
     *
     * @param {String} shelf The shelf to assign the book to.
     * One of the following categories: currentlyReading, wantToRead, read or none.
     * @param {Object} bookIds The book ids and shelf category returned from the server.
     * @param {Object} booksObject Object containing all of the books indexed by id.
     */
    updateBookShelf = (shelf, bookIds, booksObject) => {
        bookIds.forEach((id) => {
            if (booksObject[id]) {
                if (booksObject[id].shelf !== shelf) {
                    booksObject[id].shelf = shelf;
                }
            }
        })
    };

    /**
     * Converts the book state array to an Object of books indexed by book id.
     * @param {Book[]} booksArray
     * @returns {Object} Object of books indexed by id.
     */
    booksArrayToObject = (booksArray) => {
        let bookObject = {};

        booksArray.forEach((book) => {
            bookObject[book.id] = book;
        });

        return bookObject;
    };

    /**
     * Converts the bookObject to an array of Books.
     * @param {Object} booksObject
     * @returns {Array}
     */
    booksObjectToArray = (booksObject) => {
        let p,
            booksArray = [];

        for (p in booksObject) {
            if (booksObject.hasOwnProperty(p)) {
                booksArray.push(booksObject[p])
            }
        }

        return booksArray;
    };


    render() {
        let booksByCategory = this.state.books.reduce(function (acc, book) {
            switch (book.shelf) {
                case 'currentlyReading':
                    acc.currentlyReading.push(book);
                    break;
                case 'wantToRead':
                    acc.wantToRead.push(book);
                    break;
                case 'read':
                    acc.read.push(book);
            }
            return acc;
        }, {
            currentlyReading: [],
            wantToRead: [],
            read: []
        });

        return <div className="App">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <Route exact path='/' render={() => (
                <div>
                    <BookShelf
                        title="Currently Reading"
                        books={booksByCategory.currentlyReading}
                        onUpdate={this.updateBook}
                    />
                    <BookShelf
                        title="Want to Read"
                        books={booksByCategory.wantToRead}
                        onUpdate={this.updateBook}
                    />
                    <BookShelf
                        title="Read"
                        books={booksByCategory.read}
                        onUpdate={this.updateBook}
                    />
                </div>
            )}/>

            <Route path='/search' render={() => (
                <Search
                    onUpdate={this.updateBook}
                    books={this.booksArrayToObject(this.state.books)}
                />
            )}/>

        </div>
    }
}

export default DragDropContext(HTML5Backend)(App);
