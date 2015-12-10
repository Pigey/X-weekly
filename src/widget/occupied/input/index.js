/*
 * @file occupied input
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import Loading from 'widget/loading'
import IconOk from './img/ok.svg'

export default React.createClass ({

  getInitialState: function () {
    return {
      value: null,
      submiting: false,
      manuallyChanged: false
    }
  },

  getDefaultProps: function () {
    return {
      value: null,
      saved: null,
      onSubmit: function () {}
    }
  },

  handleChange: function (manually) {
    this.setState({ value: this.refs.input.value })
    if (manually) {
      this.setState({ manuallyChanged: true })
    }
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

  componentDidMount: function () {
    this.handleChange()
  },

  render: function () {

    let options = [
      '无所事事',
      '略清闲',
      '挺充实',
      '有点忙',
      '忙成狗了'
    ].map(
      (desc, index) => {
        let value = index + 1
        return <option key={value} value={value}>{desc}</option>
      }
    )

    let submiting = this.state.submiting

    let handleSubmit = submiting
      ? null
      : this.handleSubmit

    let button = submiting
      ? <button className='submit' disabled><Loading className="loading" /></button>
      : <button type='submit' className='submit'><IconOk className="icon" /></button>

    let value = this.state.manuallyChanged ? this.state.value : this.props.value
    let dirty = value !== this.props.saved

    return (
      <form className='w-occupied-input' onSubmit={handleSubmit}>
        我这周的忙碌程度为
        <select ref='input' className='input' value={value} onChange={this.handleChange}>
          {options}
        </select>
        {dirty ? button : ''}
      </form>
    )
  }
})

