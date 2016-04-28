import React, { Component, PropTypes } from 'react'
import { addCommas } from '../utils'

class Top10 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, type} = this.props

    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>
        {data.map((d, i) => {
          return (
            <tr key={i}>
              <td className={(type === 'articles' ? 'small-text' : '')}>{d.term}</td>
              <td>{addCommas(d.hits)}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

Top10.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    hits: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Top10
