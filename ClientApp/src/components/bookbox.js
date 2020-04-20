import React from 'react'
import ReactDom from 'react-dom'

class Bookbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { book: this.bookElement, loading: true };
    }

    componentDidMount() {
        this.populateBookData();
    }

    bookElement = {
        isbn: "",
        title: "",
        author: "",
        yearOfPublication: 0,
        imageUrlS: "",
        imageUrlM: "",
        imageUrlL: ""
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

    async populateBookData() {
        const response = await fetch('https://localhost:44356/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }
}