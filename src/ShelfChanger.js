import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';

class ShelfChanger extends Component {


    updateShelf = (book, event) => {
        this.props.updateBook(book, event.target.value);
    };

    static propTypes = {
        book: PropTypes.object.isRequired,
        value: PropTypes.string.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    render() {

        return (

            <div className="book-shelf-changer">
                <select
                    value={this.props.value}
                    onChange={(event) => this.updateShelf(this.props.book, event)}
                >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>

        )
    }

}

export default ShelfChanger;