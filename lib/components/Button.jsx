import React from 'react'

export default class Button extends React.Component {
  render() {
    return (
      <button className={this.props.cl} onClick={this.props.action}>{this.props.text}</button>
    )
  }
}
