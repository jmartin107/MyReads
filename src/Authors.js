import React, {Component} from 'react';
import './App.css';

/**
 * Component to display the list of book authors.
 */
class Authors extends Component {

    render() {
        let authors = this.props.authors ? this.props.authors : [];
        return (

            <div className="book-authors">
                {authors.map((author) => (
                    <div key={author}>{author}</div>
                ))}
            </div>
        )
    }
}

export default Authors