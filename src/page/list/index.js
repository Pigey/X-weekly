/*
 * @file list page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import weeker from 'mixin/weeker'
import ProjectList from 'widget/project/list'
import { Task as TaskModel } from 'model'
import { tasksToProjects } from 'widget/util'

export default React.createClass ({

  mixins: [weeker],

  getInitialState: function () {
    return {
      tasks: []
    };
  },

  refreshTasks: function (params) {
    let me = this

    params = Object.assign({
      week: this.getWeek()
    }, params)

    TaskModel.list(params).then(function (list) {
      me.setState({
        tasks: list
      })
    })
  },

  handleWeekChange: function(week) {
    this.refreshTasks({
      week: week
    })
  },

  componentDidMount: function () {
    TaskModel.on('change', this.refreshTasks.bind(this, null))
    this.refreshTasks()
  },

  render: function () {
    return (
      <div className='main'>
        <ProjectList projects={tasksToProjects(this.state.tasks)} />
      </div>
    )
  }

})
