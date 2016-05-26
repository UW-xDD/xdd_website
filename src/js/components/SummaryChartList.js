import React, { Component, PropTypes } from 'react'
import SummaryChart from './SummaryChart'

class SummaryChartList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    const { dictionaries } = this.props

    return (
      <div>
        <SummaryChart
          chart_id={'ingestion'}
          dictionaries={this.props.dictionaries}
        />

      </div>
    )
  }
}

SummaryChartList.propTypes = {
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    dict_id: PropTypes.number.isRequired,
    showDetails: PropTypes.bool.isRequired
  }).isRequired).isRequired
}

export default SummaryChartList
