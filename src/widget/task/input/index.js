/*
 * @file task input
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { throttle } from 'util'

export default React.createClass ({

  getInitialState: function () {
    return {
      invalid: []
    }
  },

  getDefaultProps: function () {
    return {
      person: '',
      projects: [],
      statuses: [],
      onSubmit: function () {},
      onPersonChange: function () {}
    }
  },

  handleChange: throttle(function () {
    this.validate()
  }),

  handlePersonChange: throttle(function (e) {
    this.handleChange(e)
    this.props.onPersonChange(e.target.value.trim())
  }),

  handleSubmit: function (e) {
    e.preventDefault()

    if (!this.validate()) {
      return
    }

    let me = this
    this.props.onSubmit(this.value()).then(() => {
      me.refs.cnt.value = ''
    })
  },

  value: function () {
    let refs = this.refs
    return {
      person: refs.person.value.trim(),
      project: refs.project.value,
      cnt: refs.cnt.value.trim(),
      status: refs.status.value
    }
  },

  validate: function () {
    let value = this.value()
    let invalid = ['person', 'project', 'cnt', 'status'].filter(key => {
      return !value[key]
    })

    this.setState({ invalid })
    return !invalid.length
  },

  render: function () {
    let me = this

    let toOption = (item => (
      <option key={item._id} onChange={me.handleChange} value={item.name}>
        {item.name}
      </option>
    ))

    let invalid = me.state.invalid

    let getClass = (name => {
      return `${name}-in` + (
        invalid.indexOf(name) >= 0
          ? ' invalid'
          : ''
      )
    })

    let projectOptions = this.props.projects.map(toOption)
    let statusOptions = this.props.statuses.map(toOption)

    return (
      <form className='w-task-input' onSubmit={this.handleSubmit}>
        <div className='line'>
          <input className={getClass('person')} ref='person' type='text' placeholder='姓名' defaultValue={this.props.person} onChange={this.handlePersonChange} />
          <select className={getClass('project')} ref='project' onChange={this.handleChange}>
            {projectOptions}
          </select>
        </div>
        <div className='line'>
          <input className={getClass('cnt')} ref='cnt' type='text' placeholder='内容' onChange={this.handleChange} />
          <select className={getClass('status')} ref='status' onChange={this.handleChange}>
            {statusOptions}
          </select>
        </div>
        <button type='submit' className='submit'>添加</button>
      </form>
    )
  }
})

