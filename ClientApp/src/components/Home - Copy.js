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
      <div>
        <h1>Wecome to Bookwalker Cafe!</h1>
        <p>Immerse Yourself in a World of Words.:</p>
           {contents}
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
    );
    }

    async populateBookData() {
        const response = await fetch('https://localhost:44356/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    static renderBookScroller(books) {

       return( <ImageScroller>
            {books.map(books => <img src={books.imageUrlS} />) }
            </ImageScroller>)
    }
}
