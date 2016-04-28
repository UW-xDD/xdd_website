import { combineReducers } from 'redux'
import { TOGGLE_DICTIONARY, REQUEST_DICTIONARIES, RECIEVE_DICTIONARIES } from '../actions'
// import all reducers here

const stats = (state = [], action) => {
  switch (action.type, state) {
    case TOGGLE_DICTIONARY:
      return Object.assign({}, state, {
        showDetails: action.dict_id
      })

    default:
      return state
  }
}

function formatDates(data, type) {
  let categories = {
    'fresh': 0,
    'recent': 0,
    'stale': 0,
    'old': 0
  }

  data.forEach(dict => {
    var since = parseInt((Date.now() - Date.parse(dict[type])) / 86400000)
    switch (true) {
      case (since <= 4):
        categories.fresh += 1
        break;
      case (since <= 8):
        categories.recent += 1
        break;
      case (since <= 12):
        categories.stale += 1
        break;
      default:
        categories.old += 1
        break
    }
  })

  return Object.keys(categories).map(d => { return categories[d] });
}

const handleFetching = (state = {
  isFetching: false,
  items: [],
  ingestions: [0, 0, 0, 0],
  subsets: [0, 0, 0, 0],
  showDetails: -1
}, action) => {

  switch (action.type) {
    case TOGGLE_DICTIONARY:
      return Object.assign({}, state, {
        showDetails: (action.dict_id == state.showDetails) ? -1 : action.dict_id
      })
    case REQUEST_DICTIONARIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_DICTIONARIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.dictionaries,
        ingestions: formatDates(action.dictionaries, 'ingestion_date'),
        subsets: formatDates(action.dictionaries, 'subset_date')
      })
    default:
      return state
  }
}



const reducers = combineReducers({
  // list reducers here
  stats,
  handleFetching
})

export default reducers
