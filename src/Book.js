import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ShelfChanger from './ShelfChanger'
import Authors from './Authors'
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes'


const bookSource = {

    /**
     * Called by React DnD
     * @param {Object} props The properties associated with the Book drag source.
     * @returns {Object}
     */
    beginDrag(props) {
        return {
            book: props.book,
            onUpdate: props.onUpdate
        }
    },

    /**
     * Called by React DnD when the drop source is dropped on a target.
     * Updates the book shelf for the dropped Book.
     * @param {Object} props The properties associated with the Book drag source.
     * @param monitor
     */
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            props.onUpdate(item.book, dropResult.category);
        }
    },
};

/**
 * Called by React DnD.
 * @param connect
 * @param monitor
 * @returns {{connectDragSource: *}}
 */
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

/**
 * Component to render a Book.
 */
class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired
    };

    render() {
        const { book, onUpdate, connectDragSource } = this.props;

        let imageLink = book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover';

        return connectDragSource (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className='book-cover' style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${imageLink})`
                        }}/>
                        <ShelfChanger
                            book={book}
                            updateBook={onUpdate}
                            value={book.shelf}
                        />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <Authors
                        authors={book.authors}
                    />
                </div>
            </li>
        )
    }
}

export default DragSource(ItemTypes.BOOK, bookSource, collect)(Book);