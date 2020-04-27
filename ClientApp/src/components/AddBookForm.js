import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export class AddBookForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isbn: "",
            title: "",
            author: "",
            yearOfPublication: 0,
            publisher: "",
            imageUrlS: "https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg",
            imageUrlM: "https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg",
            imageUrlL: "https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg",
            bookQuantity: 0
        };

        this.renderBookForm = this.renderBookForm.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("isbn : " + this.state.isbn)
        console.log("title : " + this.state.title)
        console.log("author : " + this.state.author)
        console.log("year published : " + this.state.yearOfPublication)
        console.log("publisher : " + this.state.publisher)
        console.log("Small : " + this.state.imageUrlS)
        console.log("Medium : " + this.state.imageUrlM)
        console.log("Large : " + this.state.imageUrlL)
        console.log("bookQuanity : " + this.state.bookQuantity)
        const url = '/api/books'
        const data = {
            Isbn: this.state.isbn,
            Title: this.state.title,
            Author: this.state.author,
            YearOfPublication: parseInt(this.state.yearOfPublication),
            Publisher: this.state.publisher,
            ImageUrlS: this.state.imageUrlS,
            ImageUrlM: this.state.imageUrlM,
            ImageUrlL: this.state.imageUrlL,
            BookQuantity: parseInt(this.state.bookQuantity)
        }
        fetch(url, {
            method: 'POST', // or ‘PUT’
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                alert("Book added!");
                console.log(response);
                window.location.reload();
                return response;
            } else {
                alert("Error adding book.");
                console.log('Something happened wrong');
                console.log(data);

            }
        }).catch(err => err);
 }


    renderBookForm() {

        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    ISBN:
                <input id="isbn"
                        name="isbn"
                        type="text"
                        onChange={this.handleChange}
                        required />
                </label><br></br>
                <label>
                    Title:
                <input id="title"
                        name="title"
                        type="text"
                        onChange={this.handleChange}
                        required />
                </label><br></br>
                <label>
                    Author:
                <input id="author"
                        name="author"
                        type="text"
                        onChange={this.handleChange}
                        required />
                </label><br></br>
                <label>
                    Publication Year:
                <input id="yearOfPublication"
                        name="yearOfPublication"
                        type="number"
                        min="0"
                        onChange={this.handleChange}
                        required />
                </label><br></br>
                <label>
                    Publisher:
                <input id="publisher"
                        name="publisher"
                        type="text"
                        onChange={this.handleChange}
                        required />
                </label><br></br>
                <label>
                    Author:
                <input id="imageUrlS"
                        name="imageUrlS"
                        type="text"
                        onChange={this.handleChange}
                        defaultValue="https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg"
                        required />
                </label><br></br>
                <label>
                    Author:
                <input id="imageUrlM"
                        name="imageUrlM"
                        type="text"
                        onChange={this.handleChange}
                        defaultValue="https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg"
                        required />
                </label><br></br>
                <label>
                    Author:
                <input id="imageUrlL"
                        name="imageUrlL"
                        type="text"
                        defaultValue="https://i.pinimg.com/originals/49/80/d7/4980d751d522ce2eb66e28c45ced8ed0.jpg"
                        required />
                </label><br></br>
                <label>
                    Number Of Copies:
                <input id="booQuantity"
                        name="bookQuantity"
                        type="number"
                        min="0"
                        onChange={this.handleChange}
                        required />
                </label><br></br><br></br>
                <button type="submit">Submit Book Data</button>
            </form>
        );
    }

    render() {

        let contents = this.renderBookForm();

        return (
            <div>
                <h1> Add A New Book </h1>
                {contents}
            </div>
        );
    }
}
