import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes'
import {DropTarget} from 'react-dnd';

const bookShelfTarget = {

    /**
     * Called by React DnD. Provides the shelf category property to the drop target.
     * @param props
     * @returns {Object}
     */
    drop(props) {
        return {
            category: props.category
        }
    }
};

/**
 * Called by React DnD
 * @param connect
 * @param monitor
 * @returns {Function}
 */
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class BookShelf extends Component {

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired
    };

    render() {

        const {connectDropTarget} = this.props;

        let filteredBooks = this.props.books.filter((book) => {
            return book.shelf === this.props.category;
        });

        return connectDropTarget(
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {filteredBooks.map((book) => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    onUpdate={this.props.onUpdate}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default DropTarget(ItemTypes.BOOK, bookShelfTarget, collect)(BookShelf);