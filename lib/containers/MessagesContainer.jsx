import React, { Component } from 'react'
import { pick, map, extend, sortBy, filter, includes } from 'lodash'
import firebase, { reference } from '../firebase'
import Sort from '../components/Sort.jsx'
import Filter from '../components/Filter.jsx'
import UsersContainer from '../containers/UsersContainer.jsx'


const Message = require('../components/Message.jsx')

export default class MessagesContainer extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      filterValue: '',
      userValue: '',
    }
    this.sort = this.sort.bind(this)
    this.setFilterSearchState = this.setFilterSearchState.bind(this)
    this.setFilterUserState = this.setFilterUserState.bind(this)
    this.clearUserValue = this.clearUserValue.bind(this)
  }

  componentWillReceiveProps() {
    reference.limitToLast(100).on('value', (snapshot) => {
      const messages = snapshot ? snapshot.val() : {}
      this.setState({
        messages: map(messages, (val, key) => extend(val, { key })),
      })
    })
  }

  sort(direction) {
    const messages = this.state.messages
    const sortedMessages = messages.sort((a, b) => { return direction === 'down' ? b.id - a.id : a.id - b.id })

    this.setState({
      messages: sortedMessages,
    })
  }

  setFilterUserState(e) {
    const userValue = e.target.attributes[1].value
    this.setState({ userValue })
  }

  setFilterSearchState(e) {
    const value = e.target.value.toLowerCase()
    this.setState({ filterValue: value })
  }

  filterSearch() {
    return filter(this.state.messages, m => includes(m.content, this.state.filterValue))
  }

  filterUser(filteredMessages) {
    return filter(filteredMessages, m => includes(m.user.email, this.state.userValue))
  }

  clearUserValue() {
    this.setState({ userValue: '' })
  }

  render() {
    const { messages, filterValue, userValue } = this.state

    const user = this.props.user

    let filteredMessages = this.filterSearch()
    filteredMessages = this.filterUser(filteredMessages)

    return (
      <section>
        <section className='header'>
          <div>
            <h1 className='title'>chatterbox</h1>
            <Filter filter={this.setFilterSearchState}/>
          </div>
          <Sort sort={this.sort}/>
        </section>
        <UsersContainer user={user} messages={messages} userValue={userValue} filterUser={this.setFilterUserState} clearUserValue={this.clearUserValue}/>
        <section className='messages-container'>
          <ul className='messages-list'>
          { user ? filteredMessages.map(m => <Message key={m.key} name={m.user.displayName} content={m.content} time={m.createdAt} />) : '' }
          </ul>
        </section>
      </section>
    )
  }
}
