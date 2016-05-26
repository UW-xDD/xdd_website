import React, { Component, PropTypes } from 'react'
import { addCommas } from '../utils'

class Top10 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, type } = this.props

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
          switch (type) {
            case 'terms':
              return (
                <tr key={i}>
                  <td>{d.term}</td>
                  <td>{addCommas(d.hits)}</td>
                </tr>
              )
            case 'articles':
              return (
                <tr key={i}>
                  <td className='small-text'>{d.authors}. <a href='{d.content_url}'>{d.title}</a>. {d.pubname}. {d.coverdate}. {d.source}.</td>
                  <td>{addCommas(d.hits)}</td>
                </tr>
              )
            case 'journals':
              return (
                <tr key={i}>
                  <td>{d.pubname} <span className='small-text source'>{d.source}</span></td>
                  <td>{addCommas(d.hits)}</td>
                </tr>
              )
            default:
              return
          }
        })}

        </tbody>
      </table>
    )
  }
}

Top10.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    hits: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Top10
