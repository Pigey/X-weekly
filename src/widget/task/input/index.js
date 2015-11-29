/*
 * @file task input
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { throttle } from 'util'
import Loading from 'widget/loading'

export default React.createClass ({

  getInitialState: function () {
    return {
      invalid: [],
      submiting: false
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

    this.setState({
      submiting: true
    })

    let onSubmit = () => {
      this.refs.cnt.value = ''
      this.setState({
        submiting: false
      })
    }

    this.props.onSubmit(this.value()).then(onSubmit, onSubmit)
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

    let invalid = me.state.invalid
    let getClass = (name => {
      return `${name}-in` + (
        invalid.indexOf(name) >= 0
          ? ' invalid'
          : ''
      )
    })

    let [ projects, statuses ] = [ this.props.projects, this.props.statuses ].map(list => {
      let loading = !list.length
      return {
        loading: loading ? ' loading' : '',
        options: loading
          ? <option>Loading ...</option>
          : list.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
      }
    })

    let submiting = this.state.submiting

    let handleSubmit = submiting
      ? null
      : this.handleSubmit

    let button = submiting
      ? <button className='submit' disabled><Loading theme='light' /></button>
      : <button type='submit' className='submit'>添加</button>

    return (
      <form className='w-task-input' onSubmit={handleSubmit}>
        <div className='line'>
          <input className={getClass('person')} ref='person' type='text' placeholder='姓名' defaultValue={this.props.person} onChange={this.handlePersonChange} />
          <select className={getClass('project') + projects.loading} ref='project' onChange={this.handleChange}>
            {projects.options}
          </select>
        </div>
        <div className='line'>
          <input className={getClass('cnt')} ref='cnt' type='text' placeholder='内容' onChange={this.handleChange} />
          <select className={getClass('status') + statuses.loading} ref='status' onChange={this.handleChange}>
            {statuses.options}
          </select>
        </div>
        {button}
      </form>
    )
  }
})

