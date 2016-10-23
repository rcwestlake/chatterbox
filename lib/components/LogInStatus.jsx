import React, { Component } from 'react'
import firebase, { reference, signIn, signOut } from '../firebase'
import Button from './Button.jsx'

export default class LogInStatus extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.props.updateUser(user))

  }

  render() {
    return (
      <section className='login-status-container'>
        {this.props.user ? <Button cl='sign-out-button' text='Log Out' action={() => signOut() }/> : ''}
        {this.props.user ? <p>Logged in as <span className='login-name'>{this.props.user.displayName.split(' ')[0]}</span> ({this.props.user.email})</p> : <Button cl='sign-in-button' text='Log In' action={() => signIn()}/> }
      </section>
    )
  }
}
