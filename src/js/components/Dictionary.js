import React, { Component, PropTypes } from 'react'

function findClass(d) {
  d = parseInt(d)
  switch (true) {
    case (d == 0):
      return 'best'
    case (d < 17):
      return 'worst'
    case (d < 34):
      return 'bad'
    case (d < 42):
      return 'meh'
    case (d < 67):
      return 'good'
    case (d < 84):
      return 'better'
    case (d <= 100):
      return 'best'
    default:
      return 'worst'
  }
}

function findStrength(d) {
  switch (true) {
    case (d < 25):
      return 'frog'
    case (d < 50):
      return 'yoda'
    case (d < 75):
      return 'hulk'
    default:
      return 'godzilla'
  }
}

function parseDate(d) {
  let since = parseInt((parseInt((Date.now() - Date.parse(d)) / 86400000) / 14) * 100)
  return findClass(100 - since)
}

class Dictionary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dict_id, name, term_strength, pub_strength, hit_strength, doc_strength, n_terms, coverage, ingestion_date, subset_date, n_docs, hits, n_pubs, onClick } = this.props
    console.log(this.props)
    return (
      <div className='stat-container'>
        <div className='row'>
          <div className='col-sm-6 stat-box title' onClick={onClick}>
            {name}
          </div>
          <div className={'col-sm-3 stat-box ' + findStrength(term_strength)}>
            <span>{n_terms}</span>
            terms
          </div>
          <div className={'col-sm-3 stat-box status ' + findClass(coverage)}>
            <span>{coverage != '0' ? coverage : '100'}%</span>
            coverage
          </div>
        </div>
        <div className='row'>
          <div className={'col-sm-3 stat-box status ' + parseDate(ingestion_date)}>
            <span>{ingestion_date}</span>
            last ingestion
          </div>
          <div className={'col-sm-3 stat-box status ' + parseDate(subset_date)}>
            <span>{subset_date || 'Unknown'}</span>
            last subset
          </div>
          <div className={'col-sm-2 stat-box ' + findStrength(hit_strength)}>
            <span>{hits}</span>
            hits
          </div>
          <div className={'col-sm-2 stat-box ' + findStrength(doc_strength)}>
            <span>{n_docs}</span>
            unique docs
          </div>
          <div className={'col-sm-2 stat-box ' + findStrength(doc_strength)}>
            <span>{n_pubs}</span>
            publications
          </div>
        </div>
      </div>
    )
  }
}


Dictionary.propTypes = {
  onClick: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired
}

export default Dictionary
