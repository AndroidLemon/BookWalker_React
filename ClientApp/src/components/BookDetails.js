import React, { Component } from 'react';
import './container.css'

export class BookDetails extends Component {
    static displayName = BookDetails.name;


    constructor(props) {
        super(props);
        this.state = { books: Object, loading: true };

        // Bind handleButtonClick
        // this.handleButtonClick = this.handleButtonClick.bind(this);
        
    }

    // handleButtonClick(event){
    //     alert("Button was clicked!")
    // }

    componentDidMount() {
        this.populateBookData();
    }

    async populateBookData(isbn) {
       const bookURL = '/api/Books/' + window.location.pathname.split("/").pop();
        const response = await fetch(bookURL);
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    static renderBookDetails(books) {
        return (
            <div class="row align-spaced">
                {
                    <div class="column small-6">
                        <img src={books.imageUrlL} styles="float:left" />
                    </div>
                }
                {
                    <div class="column small-6 align-left">
                        <div class="card-divider">
                            <strong>{books.title}</strong>
                        </div>
                            <p>ISBN: {books.isbn}</p>
                            <p>Author: {books.author}</p>
                            <p>Year Published: {books.yearOfPublication}</p>
                            <p>Published By: {books.publisher}</p>
                            <p>Quantity In Stock: {books.bookQuantity}</p>
                    </div>
                }
                {/* <button onClick={handleButtonClick}>Checkout</button> */}
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
