import React, { Component } from 'react';
import './container.css'


export class BookDetails extends Component {
    static displayName = BookDetails.name;


    constructor(props) {
        super(props);
        this.state = { books: Object, loading: true };

        // Bind handleButtonClick
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        this.populateBookData();
    }

    async populateBookData(isbn) {
        const bookURL = '/api/Books/' + window.location.pathname.split("/").pop();
        const response = await fetch(bookURL);
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    // PUT: api/books?isbn={...}&value={...}
    handleClick(numBooks) {

        if (numBooks < 0 && this.state.books.bookQuantity <= 0) {
            alert("This book is out of stock. We're so sorry!");
            return;
        }

        const url = '/api/books?isbn=' + window.location.pathname.split("/").pop() + '&value=' + numBooks;

        fetch(url, {
            method: 'PUT',
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                alert((numBooks < 0 ? "Enjoy the book, and please remember to return!" : "Thank you for returning this book, it's appreciated!"));
                window.location.reload();
                return response;
            } else {
                alert("Error adding book.");
                console.log('Something happened wrong');

            }
        }).catch(err => err);
    }

    renderBookDetails(books) {
        return (
            <div class="row align-spaced">
                <div class="column small-6">
                    <img src={books.imageUrlL} styles="float:left" />
                </div>
                <div class="card">
                    <div class="column small-3">
                        <div class="title">
                            <h2><strong>{books.title}</strong></h2>
                        </div>
                        <div class="info">
                            <p>ISBN: <strong>{books.isbn}</strong></p>
                            <p>Author: <strong>{books.author}</strong></p>
                            <p>Year Published: <strong>{books.yearOfPublication}</strong></p>
                            <p>Published By: <strong>{books.publisher}</strong></p>
                            <p>Quantity In Stock: <strong>{books.bookQuantity}</strong></p>
                        </div>
                    </div>
                    <div class="column small-3">
                        <div class ="buttons">
                            <div class="column small-3">
                                <button class="hollow button" onClick={this.handleClick.bind(this, 1)} >Return Book</button>
                                <button class="success button" onClick={this.handleClick.bind(this, -1)} >Withdraw Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBookDetails(this.state.books);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
