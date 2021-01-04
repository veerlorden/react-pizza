const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0
}

let allItems = {}
let allPizzas = []

const getTotalPrice = arr => arr.reduce((sum, pizza) => pizza.price + sum, 0)
const getAllPizzas = object => Object.values(Object.values(object).map(obj => obj.items)).flat()

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART':
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload]
      allItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalCurrentPrice: getTotalPrice(currentPizzaItems),
        }
      }
      allPizzas = getAllPizzas(allItems)

      return {
        ...state,
        items: allItems,
        totalCount: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas)
      }

    case 'REMOVE_CART_PIZZA':
      allItems = {
        ...state.items
      }
      delete allItems[action.payload]
      allPizzas = getAllPizzas(allItems)

      return {
        ...state,
        items: allItems,
        totalPrice: getTotalPrice(allPizzas),
        totalCount: allPizzas.length
      }

    case 'PIZZA_INCREMENT': {
      allItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: allItems,
            totalCurrentPrice: getTotalPrice(allItems),
          }
        },
        totalPrice: state.totalPrice + state.items[action.payload].items[0].price,
        totalCount: state.totalCount + 1
      }
    }

    case 'PIZZA_DECREMENT': {
      const oldItems = state.items[action.payload].items
      allItems = oldItems.length > 1 ? oldItems.slice(1) : oldItems
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: allItems,
            totalCurrentPrice: getTotalPrice(allItems),
          }
        },
        totalPrice: state.totalPrice - state.items[action.payload].items[0].price,
        totalCount: state.totalCount - 1
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export default cart
