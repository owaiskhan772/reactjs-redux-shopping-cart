import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as cartActions from '../../actions/cartActions';

class BookItem extends React.Component {

  constructor(){
    super();
    this.state = { isClicked: false };
  }

  onReadMore(){
    this.setState({ isClicked: true });
  }

  handleCart(){
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      image: this.props.image,
      price: this.props.price,
      quantity: 1
    }];
    //CHECK IF CART IS EMPTY
    if(this.props.cart.length > 0){
      //CART IS NOT EMPTY
      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      });

      //IF cartIndex IS -1, THERE ARE NO ITEMS WITH SAME ID
      if(cartIndex == -1){
        this.props.addToCart(book);
      }else{
        this.props.updateCart(_id, 1, this.props.cart);
      }

    }else{
      //CART IS EMPTY
      this.props.addToCart(book);
    }
  }

  render(){
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.image} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{ this.props.title }</h6>
            <p>
              { (this.props.description.length > 40 && this.state.isClicked === false) ? (this.props.description.substring(0, 40)) : (this.props.description)  }
              <button className='link' onClick={ this.onReadMore.bind(this)}>
                { (this.state.isClicked === false && this.props.description.length != null && this.props.description.length > 40) ? ('...read more') : ('')}
              </button>
            </p>
            <h6>${ this.props.price }</h6>
            <Button onClick={ this.handleCart.bind(this) } bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state){
    return{
      cart: state.cart.cart
    };
}

function mapDispatchToProps(dispatch){
  return{
    addToCart: (book) => dispatch(cartActions.addToCart(book)),
    updateCart: (_id, unit, cart) => dispatch(cartActions.updateCart(_id, unit, cart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
