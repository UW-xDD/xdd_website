import React, { Component, PropTypes } from 'react'

class Dictionary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props
    console.log(this.props)
    return (
      <div>{name}</div>
    )
  }
}


Dictionary.propTypes = {
  onClick: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired
}

export default Dictionary
