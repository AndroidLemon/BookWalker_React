import React, { Component } from 'react';

export class FetchBookData extends Component {
    static displayName = FetchBookData.name;

    constructor(props) {
        super(props);
        this.state = { books: [], loading: true };
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
                        <th>Thumbnail</th>
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
                            <td> <img src={books.imageUrlS} /> </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchBookData.renderBooksTable(this.state.books);

        return (
            <div>
                <h1 id="tabelLabel" >BookWalker Library</h1>
                <p>Here is a list of currently available books in our library.</p>
                {contents}
            </div>
        );
    }

    async populateBookData() {
        const response = await fetch('https://localhost:44356/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }
}
