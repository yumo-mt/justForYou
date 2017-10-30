import React, { Component } from 'react'

const setPageTitle = (WrappedComponent) => {
  class WrapperComponent extends Component {
    componentDidMount = () => {
      console.log('lllkk')
      if (this.props.title && typeof this.props.title === 'string') {
        window.document.title = this.props.title
      }
    }

    render = () => {
      return <WrappedComponent {...this.props} />
    }
  }

  return WrapperComponent
}

export default setPageTitle

// @setPageTitle
