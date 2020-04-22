import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchBookData } from './components/FetchBookData';

import './custom.css'
import { BookDetails } from './components/BookDetails';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/book-details' component={BookDetails} />
            <Route path='/fetch-data' component={FetchBookData} />
      </Layout>
    );
  }
}
