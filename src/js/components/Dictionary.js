import React, { Component, PropTypes } from 'react'

class Dictionary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, onClick } = this.props
    console.log(this.props)
    return (
      <div className='row'>
        <div className='col-sm-12' onClick={onClick}>
          {name}
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
