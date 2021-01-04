import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components'
import { setCategory, setSortBy } from '../redux/actions/filters'
import { fetchPizzas } from '../redux/actions/pizzas'
import { addPizzaToCart } from '../redux/actions/cart'

const categoryNames = ["Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"]
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' }
]

function Home() {
  const dispatch = useDispatch()
  const items = useSelector(({ pizzas }) => pizzas.items)
  const cartItems = useSelector(({ cart }) => cart.items)
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
  const { category, sortBy } = useSelector(({ filters }) => filters)

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category))
  }, [sortBy, category, dispatch])

  const handleSetCategory = (index) => {
    dispatch(setCategory(index))
  }

  const handleSortType = (type) => {
    dispatch(setSortBy(type))
  }

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={handleSetCategory}
          items={categoryNames} />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={handleSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
            ? items.map(obj => {
              return (
                <PizzaBlock
                  onClickAddPizza={handleAddPizzaToCart}
                  pizzaCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  key={obj.id}
                  {...obj} />
              )
            })
            : Array(12)
                .fill(0)
                .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  )
}

export default Home
