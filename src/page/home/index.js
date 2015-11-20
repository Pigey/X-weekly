/*
 * @file home page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import ProjectList from 'widget/project/list'
import TaskInput from 'widget/task/input'

import {
  Project as ProjectModel,
  Status as StatusModel,
  Task as TaskModel
} from 'model'

import { getWeek, tasksToProjects } from 'widget/util'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      week: getWeek()
    }
  },

  getInitialState: function () {
    return {
      username: localStorage.username,
      projects: [],
      statuses: [],
      tasks: []
    };
  },

  refresh: function (model, name, params) {
    let me = this

    model.list(params).then(function (list) {
      me.setState({
        [name]: list
      })
    })
  },

  refreshTasks: function () {
    this.refresh(TaskModel, 'tasks', {
      week: this.props.week,
      person: this.state.username
    })
  },

  componentDidMount: function () {
    this.refresh(ProjectModel, 'projects')
    this.refresh(StatusModel, 'statuses')
    this.refreshTasks()

    TaskModel.on('change', this.refreshTasks)
  },

  handleUsernameChange: function (username) {
    this.setState({ username }, this.refreshTasks)
    localStorage.username = username
  },

  handleTaskCreate: function (task) {
    return TaskModel.create(Object.assign(task, {
      week: this.props.week
    }))
  },

  render: function () {
    return (
      <div className='main'>
        <TaskInput person={this.state.username} projects={this.state.projects} statuses={this.state.statuses} onPersonChange={this.handleUsernameChange} onSubmit={this.handleTaskCreate}></TaskInput>
        <ProjectList projects={tasksToProjects(this.state.tasks)}></ProjectList>
      </div>
    )
  }
})
