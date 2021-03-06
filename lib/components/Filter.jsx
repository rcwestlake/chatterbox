import React, { Component } from 'react'

function Filter(props) {
  return (
    <section className='title-filter-container'>
      <input
      onChange={e => props.filter(e)}
      type='text'
      className='filter-field'
      aria-label='filter-input'
      placeholder='Filter'
      />
    </section>
  )
}

module.exports = Filter
