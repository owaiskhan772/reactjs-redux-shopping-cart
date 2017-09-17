'use strict'
import React from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../actions/booksActions';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';
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
      <Grid>
        <Row>
        <Carousel>
          <Carousel.Item>
            <img width={900} height={300} alt="900x300" src="/images/home1.jpg"/>
            <Carousel.Caption>
              <h3>React.js/Redux Shopping Cart</h3>
              <p>A full fledged shopping cart developed using React.js (Redux), Node.js, Express.js, MongoDB (Mongoose) etc.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
            <Carousel.Caption>
              <h3>Motive</h3>
              <p>Learn the advance features of React.js (Redux), Node.js (Express) and MongoDB etc. An API is used for the web app requests.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Cart />
        </Row>
        <Row style={{ marginTop: '15px' }}>
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
