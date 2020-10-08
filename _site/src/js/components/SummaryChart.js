import React, { Component, PropTypes } from 'react'
import Chart from 'chart.js'

class SummaryChart extends Component {
  constructor(props) {
    super(props)
  }

  _update(data) {
    if (this.dictionaries && this.dictionaries.reduce((a, b) => { return a + b }, 0) > 0) {
      return
    }

    const { chart_id, dictionaries } = data
    this.dictionaries = dictionaries
    Chart.defaults.global.legend.display = false
    this.chart = new Chart(document.getElementById(chart_id), {
      type: 'pie',
      data: {
          labels: [
              '0-4 days',
              '4-8 days',
              '8-12 days',
              '12+ days'
          ],
          datasets: [{
            data: dictionaries,
            backgroundColor: [
                '#2eb2ec',
                '#8cd4f4',
                '#f4ac8c',
                '#ec682e'
            ]
          }]
      }
    })
  }

  componentDidMount() {
    this._update(this.props)
  }

  componentWillReceiveProps(props) {
    this._update(props)
  }

  render() {
    const { chart_id } = this.props
    return (
      <div className='chart-container'>
        <canvas id={chart_id} height="400" width="400"></canvas>
        <p>Last {chart_id}</p>
      </div>
    )
  }
}

SummaryChart.propTypes = {
  chart_id: PropTypes.string.isRequired
}

export default SummaryChart
