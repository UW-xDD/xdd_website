import fetch from 'isomorphic-fetch'

export const TOGGLE_DICTIONARY = 'TOGGLE_DICTIONARY'

export const toggleDictionary = (dict_id) => {
  return {
    type: TOGGLE_DICTIONARY,
    dict_id
  }
}

export const REQUEST_DICTIONARIES = 'REQUEST_DICTIONARIES'

export function requestDictionaries() {
  return {
    type: REQUEST_DICTIONARIES
  }
}

export const RECIEVE_DICTIONARIES = 'RECIEVE_DICTIONARIES'

export function recieveDictionaries(json) {
  return {
    type: RECIEVE_DICTIONARIES,
    dictionaries: json
  }
}

export const fetchDictionaries = () => {
  return function (dispatch) {

    // Update state to know dictionaries are being fetched
    dispatch(requestDictionaries())

    return fetch('http://localhost:5000/api/v1/stats/dictionary?all')
      .then(response => response.json())
      .then(formatted => formatted.success.data.map(function(d) { d.showDetails = false; return d; }))
      .then(json => dispatch(recieveDictionaries(json)))
  }
}
