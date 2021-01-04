export const fetchPizzas = (sortBy, category) => dispatch => {
  dispatch(setLoaded(false))

  const categoryType = category !== null ? `category=${category}` : ''

  fetch(`/pizzas?${categoryType}&_sort=${sortBy.type}&_order=${sortBy.order}`)
      .then(response => response.json())
      .then(data => dispatch(setPizzas(data)))
}

export const setLoaded = payload => {
  return {
    type: 'SET_LOADED',
    payload
  }
}

export const setPizzas = items => {
  return {
    type: 'SET_PIZZAS',
    payload: items
  }
}
