import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';

const NotFound = () => {

    let style = {
        textAlign: "center",
        fontSize: "1.5em"
    };

    let linkStyle = {
        font: "bold 11px Arial",
        "textDecoration": "none",
        "backgroundColor": "#EEEEEE",
        color: "#333333",
        padding: "2px 6px 2px 6px",
        "borderTop": "1px solid #CCCCCC",
        "borderRight": "1px solid #333333",
        "borderBottom": "1px solid #333333",
        "borderLeft": "1px solid #CCCCCC",
        marginTop: "10px"
    };

    return (
        <div style={style}>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div style={style}>Page not Found</div>
            <Link style={linkStyle} to='/'>Home</Link>
        </div>

    )
};

export default NotFound;