import { connect } from 'react-redux'
import { toggleDictionary } from '../actions'
import DictionaryList from '../components/DictionaryList'

const mapStateToProps = (state) => {
  return {
    dictionaries: state.handleFetching.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDictionaryClick: (dict_id) => {
      dispatch(toggleDictionary(dict_id))
    }
  }
}

const VisibleDictionaries = connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionaryList)

export default VisibleDictionaries
