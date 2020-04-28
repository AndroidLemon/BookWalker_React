import React, { Component } from 'react';


export class Administration extends Component {

    static displayName = Administration.name;

    constructor(props) {
        super(props);
        this.state = { books: [], loading: true };
        
    }

    deleteRecord = (isbn) => {

        if (!window.confirm("Are you sure you wish to delete this book entry?")) {
            return;
        }
        // DELETE: api/books?isbn={...}
        console.log(isbn);
        const url = "api/books?isbn=" + isbn;
        fetch(url, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    alert("Book successfully deleted! Entry will be gone upon page reload.")
                   // window.location.reload();
                    return response;
                } else {
                    console.log("Something happened wrong");
                    alert("An error has occured.");
                }
            })
            .catch((err) => err);
    };

    componentDidMount() {
        this.populateBookData();
    }

     renderBooksTable(books) {

        return (
            <div>
                <h1> Administration Mode </h1>
                <p> If you would like to add a new book, please click here: <a class="link" href={"/add-book/"} >Add Book Form </a> </p>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publication Year</th>
                            <th>Publisher</th>
                            <th>In Stock</th>
                            <th>Thumbnail</th>
                            <th>Link To Book</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(books =>
                            <tr key={books.isbn}>
                                <td>{books.isbn}</td>
                                <td>{books.title}</td>
                                <td>{books.author}</td>
                                <td>{books.yearOfPublication}</td>
                                <td>{books.publisher}</td>
                                <td>{books.bookQuantity}</td>
                                <td> <img src={books.imageUrlS} /> </td>
                                <td> <a href={"/book-details/" + books.isbn} >Details</a> </td>
                                <td><button type="button" class="button alert" onClick={this.deleteRecord.bind(this,books.isbn)}>𝗫</button></td> 
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBooksTable(this.state.books);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateBookData() {
        const response = await fetch('/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

}