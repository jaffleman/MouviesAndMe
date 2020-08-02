import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoritReducer'

export default createStore(toggleFavorite);
