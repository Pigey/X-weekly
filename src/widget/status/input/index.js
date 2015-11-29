/*
 * @file task input
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

export default React.createClass ({

  getInitialState: function () {
    return {
      value: null,
      submiting: false
    }
  },

  getDefaultProps: function () {
    return {
      value: null,
      onSubmit: function () {}
    }
  },

  handleChange: function () {
    this.setState({
      value: this.refs.input.value
    })
  },

  handleSubmit: function (e) {
    e.preventDefault();

    this.setState({
      submiting: true
    })

    let onSubmit = () => {
      this.setState({
        submiting: false
      })
    }

    this.props.onSubmit(this.state.value).then(onSubmit, onSubmit)
  },

  render: function () {

    let options = [
      '无所事事',
      '略清闲',
      '挺充实',
      '有点忙',
      '忙成狗了'
    ].map(
      (item, index) => <option key={item} value={index + 1}>{item}</option>
    )

    let submiting = this.state.submiting

    let handleSubmit = submiting
      ? null
      : this.handleSubmit

    let button = submiting
      ? <button className='submit' disabled><Loading /></button>
      : <button type='submit' className='submit'>√</button>

    let dirty = this.state.value !== this.props.value

    return (
      <form className='w-status-input' onSubmit={handleSubmit}>
        我觉得这周
        <select ref='input' className='input' onChange={this.handleChange}>
          {options}
        </select>
        {dirty ? button : ''}
      </form>
    )
  }
})

