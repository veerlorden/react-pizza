export const addPizzaToCart = (pizzaObj) => {
  return {
    type: 'ADD_PIZZA_TO_CART',
    payload: pizzaObj
  }
}

export const clearCart = () => {
  return {
    type: 'CLEAR_CART'
  }
}

export const removeCartPizza = (id) => {
  return {
    type: 'REMOVE_CART_PIZZA',
    payload: id
  }
}

export const pizzaIncrement = (id) => {
  return {
    type: 'PIZZA_INCREMENT',
    payload: id
  }
}

export const pizzaDecrement = (id) => {
  return {
    type: 'PIZZA_DECREMENT',
    payload: id
  }
}
