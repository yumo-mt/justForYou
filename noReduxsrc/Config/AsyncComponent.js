import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AsyncLoadModule extends Component {
  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    load: PropTypes.func.isRequired,
  }
  static defaultProps = {}
  static cached = {}

  constructor(props){
    super(props);
    this.state = {
      mod: null,
    }
  }
  componentWillMount = () => {
    this.load(this.props)
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.moduleId !== this.props.moduleId) {
      if (this._reactInternalInstance && AsyncLoadModule.cached[nextProps.moduleId]) {
        this.setState({
          mod: AsyncLoadModule.cached[nextProps.moduleId],
        })
      } else {
        this.load(nextProps)
      }
    }
  }

  load = (props) => {
    if (this._reactInternalInstance) {
      this.setState({
        mod: null,
      })

      Promise
        .resolve(props.load())
        .then((mod) => {
          // handle both es imports and cjs
          const modReal = mod.default ? mod.default : mod

          AsyncLoadModule.cached[props.moduleId] = modReal

          if (this._reactInternalInstance) {
            this.setState({
              mod: modReal,
            })
          }
        })
    }
  }

  render = () => {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default AsyncLoadModule
