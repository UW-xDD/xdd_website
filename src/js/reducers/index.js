import { combineReducers } from 'redux'
import { REQUEST_DICTIONARIES, RECIEVE_DICTIONARIES } from '../actions'
//import { stats, handleFetching} from './stats'
// import all reducers here

const stats = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_DICTIONARY':
      return Object.assign({}, state, {
        showDetails: action.dict_id
      })

    default:
      return state
  }
}

const handleFetching = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_DICTIONARIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_DICTIONARIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.dictionaries
      })
    default:
      return state
  }
}



const statsApp = combineReducers({
  // list reducers here
  stats,
  handleFetching
})

export default statsApp
