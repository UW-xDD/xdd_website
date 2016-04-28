import React, { Component, PropTypes } from 'react'
import Dictionary from './Dictionary'
import SummaryChart from './SummaryChart'


class DictionaryList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dictionaries, ingestions, subsets, showDetails, onDictionaryClick } = this.props

    return (
      <div>
        <div className='row top-row'>
          <div className='col-sm-6 page-title'>
            <div className='page-title-container'>
              <div>
                <h3 className='title'>Dictionary Summary</h3>

                <span className='legend' style={{backgroundColor: '#2eb2ec'}}>0-4 days</span>
                <span className='legend' style={{backgroundColor: '#8cd4f4'}}>4-8 days</span>
                <span className='legend' style={{backgroundColor: '#f4ac8c'}}>8-12 days</span>
                <span className='legend' style={{backgroundColor: '#ec682e'}}>12+ days</span>
              </div>
            </div>
          </div>
          <div className='col-sm-3'>
            <SummaryChart
              chart_id={'ingestion'}
              dictionaries={ingestions}
            />
          </div>
          <div className='col-sm-3'>
          <SummaryChart
            chart_id={'subset'}
            dictionaries={subsets}
          />
          </div>
        </div>

        {dictionaries.map(dictionary =>
          <Dictionary
            key={dictionary.dict_id}
            {...dictionary}
            showDetails={showDetails}
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
