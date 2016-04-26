import React, { Component, PropTypes } from 'react'
import Dictionary from './Dictionary'

class DictionaryList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dictionaries, onDictionaryClick } = this.props
    return (
      <div>
        {dictionaries.map(dictionary =>
          <Dictionary
            key={dictionary.dict_id}
            {...dictionary}
            onClick={() => onDictionaryClick(dictionary.dict_id )}
          />
        )}
      </div>
    )
  }
}

DictionaryList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    dict_id: PropTypes.number.isRequired,
    showDetails: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onDictionaryClick: PropTypes.func.isRequired
}

export default DictionaryList
