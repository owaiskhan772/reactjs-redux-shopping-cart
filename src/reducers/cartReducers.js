'use strict'

export function cartReducers(state = { cart: [] }, action){
  switch (action.type) {
    case "ADD_TO_CART":
      // return { cart: [...state, ...action.payload] };
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).qty,
      };
      break;
    case "GET_CART":
      // return { cart: [...state, ...action.payload] };
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).qty,
      };
      break;
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).qty,
      };
      break;
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).qty,
      };
      break;
    default:
      return state;
  }
};

export function totals(payload){
  const totalAmount = payload.map(function(cart){
    return cart.price * cart.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0); //start adding from 0 index

  const totalQuantity = payload.map(function(qty){
    return qty.quantity;
  }).reduce(function(a, b){
    return a + b;
  }, 0); //start adding from 0 index

  return { amount: totalAmount.toFixed(2), qty: totalQuantity };
}
