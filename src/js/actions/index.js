import fetch from 'isomorphic-fetch'
import { addCommas } from '../utils'

// Define constants to be passed with actions
export const TOGGLE_DICTIONARY = 'TOGGLE_DICTIONARY'
export const RECIEVE_DICTIONARIES = 'RECIEVE_DICTIONARIES'
export const REQUEST_DICTIONARIES = 'REQUEST_DICTIONARIES'


// Define action functions
export const toggleDictionary = (dict_id) => {
  console.log('Clicked', dict_id)
  return {
    type: TOGGLE_DICTIONARY,
    dict_id
  }
}

export function requestDictionaries() {
  return {
    type: REQUEST_DICTIONARIES
  }
}

export function recieveDictionaries(json) {
  return {
    type: RECIEVE_DICTIONARIES,
    dictionaries: json
  }
}

function formatResponse(data) {
  return data.map(d => {
    d.showDetails = false
    d.coverage = parseInt((d.not_found/d.n_terms) * 100)
    d.hits = addCommas(d.hits)
    d.n_terms = addCommas(d.n_terms)
    d.n_docs = addCommas(d.n_docs)
    d.n_pubs = addCommas(d.n_pubs)
    d.not_found = addCommas(d.not_found)
    return d
  })
}

export const fetchDictionaries = () => {
  return function (dispatch) {

    // Update state to know dictionaries are being fetched
    dispatch(requestDictionaries())

    return fetch('http://localhost:5000/api/v1/stats/dictionary?all')
      .then(response => response.json())
      .then(formatted => formatResponse(formatted.success.data))
      .then(json => dispatch(recieveDictionaries(json)))
  }
}
