'use strict'
import React from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../actions/booksActions';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{

  componentDidMount(){
    this.props.getBooks();
  }

  render(){
    const booksList = this.props.books.map(function(book){
      return(
        <Col xs={12} sm={6} md={4} key={ book._id }>
          <BookItem
            _id={ book._id }
            title={ book.title }
            description={ book.description }
            image={ book.image }
            price={ book.price }
          />
        </Col>
      );
    });

    return(
      <Grid style={{ marginTop: '60px' }}>
        <Row>
          <Cart />
        </Row>
        <Row>
          { booksList }
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return{
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return{
    getBooks: () => dispatch(booksActions.getBooks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
