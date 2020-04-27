import React, { Component } from 'react';


export class Administration extends Component {

    static displayName = Administration.name;

    constructor(props) {
        super(props);
        this.state = { books: [], loading: true };
       // this.handleDelete = this.handleDelete.bind(this);

    }

    handleDelete(isbn) {
        alert("Delete Button Clicked!");
        // DELETE: api/books?isbn={...}
         console.log(isbn)
        const url = 'api/books?isbn=' + isbn
        fetch(url, {
            method: 'DELETE', 
           // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {      
                console.log(response);
                window.location.reload();
                return response;
            } else {
                console.log('Something happened wrong');
            }
        }).catch(err => err);
        
    } 

    componentDidMount() {
        this.populateBookData();
    }

    static renderBooksTable(books) {
        return (
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
                            <td> <button onClick={() => this.handleDelete(books.isbn)}>>𝗫</button> </td>
                           
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Administration.renderBooksTable(this.state.books);

        return (
            <div>
                <h1 id="tabelLabel" >BookWalker Library</h1>
                <p>Here is a list of currently available books in our library.</p>
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