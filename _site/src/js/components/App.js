import React, { Component, PropTypes } from 'react'
import VisibleDictionaries from '../containers/VisibleDictionaries'

// Import other components

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <VisibleDictionaries/>
      </div>
    )
  }
}

export default App
