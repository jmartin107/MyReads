import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import BookShelf from './BookShelf'

class Books extends Component {


    render() {

        let booksByCategory = this.props.books.reduce(function (acc, book) {
            switch (book.shelf) {
                case 'currentlyReading':
                    acc.currentlyReading.push(book);
                    break;
                case 'wantToRead':
                    acc.wantToRead.push(book);
                    break;
                case 'read':
                    acc.read.push(book);
                    break;
                default:
            }
            return acc;
        }, {
            currentlyReading: [],
            wantToRead: [],
            read: []
        });

        return (
            <div>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <BookShelf
                    title="Currently Reading"
                    books={booksByCategory.currentlyReading}
                    onUpdate={this.props.onUpdate}
                    category="currentlyReading"
                />
                <BookShelf
                    title="Want to Read"
                    books={booksByCategory.wantToRead}
                    onUpdate={this.props.onUpdate}
                    category="wantToRead"
                />
                <BookShelf
                    title="Read"
                    books={booksByCategory.read}
                    onUpdate={this.props.onUpdate}
                    category="read"
                />
            </div>
        )
    }
}

Books.propTypes = {
    onUpdate: PropTypes.func.isRequired
};

export default Books