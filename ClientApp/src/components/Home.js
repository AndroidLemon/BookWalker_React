import React, { Component } from 'react';
import ImageScroller from 'react-image-scroller';


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { books: [], loading: true };
    }

    componentDidMount() {
        this.populateBookData();
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderBookScroller(this.state.books);

        return (
            <div class="home">
                <h1>Wecome to Bookwalker Cafe!</h1>
                <p>Immerse Yourself in a World of Words.</p>
                <p> Customers are welcome to borrow books from the library. We use an honor system here, so please return them when you're finished so that others may read! </p>
                {contents}
            </div>
        );
    }

    async populateBookData() {
        const response = await fetch('https://localhost:44356/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    static renderBookScroller(books) {
        return (<ImageScroller>
            {books.map(books => <img src={books.imageUrlL} />)}
        </ImageScroller>)
    }
}
