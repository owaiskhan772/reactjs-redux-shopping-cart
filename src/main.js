'use strict'
import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from './actions/cartActions'; 

import Menu from './components/menu';
import Footer from './components/footer';

class Main extends React.Component {
  componentDidMount(){
    this.props.getCart();
  }

  render() {
    return(
      <div>
        <Menu cartItemsNumber = { this.props.totalQuantity } />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    totalQuantity: state.cart.totalQuantity
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCart: () => dispatch(cartActions.getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);