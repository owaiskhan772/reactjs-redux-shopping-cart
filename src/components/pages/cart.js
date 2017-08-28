import React from 'react';
import { Well, Panel, Row, Col, Button, Label, ButtonGroup, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as cartActions from '../../actions/cartActions';

class Cart extends React.Component {

  constructor(){
    super();
    this.state = {
      showModal: false
    };
  }

  componentDidMount(){
    this.props.getCart();
  }

  open(){
    this.setState({
      showModal: true
    });
  }

  close(){
    this.setState({
      showModal: false
    });
  }

  onDelete(_id){
    const allBooksForDelete = this.props.cart;
    const deleteIndex = allBooksForDelete.findIndex(function(cart){
      return cart._id === _id;
    });
    let cartAfterDelete =  [...allBooksForDelete.slice(0, deleteIndex), ...allBooksForDelete.slice(deleteIndex + 1)];
    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id){
    this.props.updateCart(_id, 1, this.props.cart);
  }

  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1, this.props.cart);
    }
  }

  renderEmpty(){
    return(
      <Col xs={12} sm={6} md={4}></Col>
    );
  }

  renderCart(){
    const cartListItems = this.props.cart.map(function(cartItem){
      return(
        <Panel key={ cartItem._id }>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{ cartItem.title }</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>${ cartItem.price }</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>Quantity: <Label bsStyle='success'>{ cartItem.quantity }</Label></h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button bsStyle='default' bsSize='small' onClick={ this.onDecrement.bind(this, cartItem._id, cartItem.quantity)}>-</Button>
                <Button bsStyle='default' bsSize='small' onClick={ this.onIncrement.bind(this, cartItem._id)}>+</Button>
                <span>    </span>
                <Button bsStyle='danger' bsSize='small' onClick={ this.onDelete.bind(this, cartItem._id)}>Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    }, this);
    return(
      <Panel header='Cart' bsStyle='primary'>
        { cartListItems }
        <Row>
          <Col xs={12}>
            <h6>Total amount: ${ this.props.totalAmount }</h6>
            <Button bsStyle='success' bsSize='small' onClick={ this.open.bind(this) }>PROCEED TO CHECKOUT</Button>
          </Col>
        </Row>

        <Modal show={ this.state.showModal } onHide={ this.close.bind(this) }>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved.</h6>
            <p>You will get a confirmation email, shortly.</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={12}><h6>Total Amount: ${ this.props.totalAmount }</h6></Col>
            <Button onClick={ this.close.bind(this) }>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }

  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    }else{
      return this.renderEmpty();
    }
  }
}

function mapStateToProps(state){
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQuantity: state.cart.totalQuantity
  }
}

function mapDispatchToProps(dispatch){
  return{
    deleteCartItem: (cart) => dispatch(cartActions.deleteCartItem(cart)),
    updateCart: (_id, unit, cart) => dispatch(cartActions.updateCart(_id, unit, cart)),
    getCart: () => dispatch(cartActions.getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
