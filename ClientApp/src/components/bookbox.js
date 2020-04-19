import React from 'react'
import ReactDom from 'react-dom'

class Bookbox extends React.Component {

    constructor() {
        super();

        state = this.bookElement
    }

    bookElement = {
        isbn: "",
        title: "",
        author: "",
        year_publisehd: 0,
        image_url_s: "",
        image_url_m: "",
        image_url_l: "";

    };

    render() {
        return (
            <div className="bookDiv">
            <div className="titleDiv">
            <img className="cover" alt="cover"
                        src={this.bookElement.image_url_s} />
                </div>
            </div>
            );
    }
}