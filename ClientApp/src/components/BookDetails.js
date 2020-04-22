import React, { Component } from 'react';
import './container.css'

export class BookDetails extends Component {
    static displayName = BookDetails.name;


    constructor(props) {
        super(props);
        this.state = { books: Object, loading: true };
        
    }

    componentDidMount() {
        this.populateBookData();
    }

    async populateBookData(isbn) {
       const bookURL = 'https://localhost:44356/api/Books/' + window.location.pathname.split("/").pop();
        const response = await fetch(bookURL);
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    static renderBookDetails(books) {
        return (
            <div>
                {
                    <div>
                        <img src={books.imageUrlL} styles="float:left" />
                    </div>
                }
                {
                    <div>
                        <p>ISBN: {books.isbn}</p>
                        <p>Title: {books.title}</p>
                        <p>Author: {books.author}</p>
                        <p>Year Published: {books.yearOfPublication}</p>
                        <p>Published By: {books.publisher}</p>
                    </div>
                }
            </div>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BookDetails.renderBookDetails(this.state.books);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
