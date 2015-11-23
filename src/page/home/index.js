/*
 * @file home page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import ProjectList from 'widget/project/list'
import TaskInput from 'widget/task/input'
import weeker from 'mixin/weeker'
import tag from 'mixin/tag'

import {
  Project as ProjectModel,
  Status as StatusModel,
  Task as TaskModel
} from 'model'

import { tasksToProjects } from 'widget/util'

export default React.createClass ({

  mixins: [weeker, tag],

  getInitialState: function () {
    return {
      username: localStorage.username,
      projects: [],
      statuses: [],
      tasks: []
    };
  },

  refreshModel: function (model, name, params) {
    const tag = this.createTag(name)

    let me = this
    model.list(params).then(function (list) {
      if (!me.validateTag(name, tag)) {
        return
      }

      me.setState({
        [name]: list
      })
    })
  },

  refreshProjects: function () {
    this.refreshModel(ProjectModel, 'projects')
  },

  refreshStatuses: function () {
    this.refreshModel(StatusModel, 'statuses')
  },

  refreshTasks: function (params) {
    this.refreshModel(
      TaskModel,
      'tasks',
      Object.assign({
        week: this.getWeek(),
        person: this.state.username
      }, params)
    )
  },

  handleWeekChange: function(week) {
    this.refreshTasks({
      week: week
    })
  },

  componentDidMount: function () {
    ProjectModel.on('change', this.refreshProjects)
    StatusModel.on('change', this.refreshStatuses)
    TaskModel.on('change', this.refreshTasks.bind(this, null))

    this.refreshProjects()
    this.refreshStatuses()
    this.refreshTasks()
  },

  handleUsernameChange: function (username) {
    this.setState({ username }, this.refreshTasks.bind(this, null))
    localStorage.username = username
  },

  handleTaskCreate: function (task) {
    return TaskModel.create(Object.assign(task, {
      week: this.getWeek()
    }))
  },

  render: function () {
    return (
      <div className='main'>
        <TaskInput person={this.state.username} projects={this.state.projects} statuses={this.state.statuses} onPersonChange={this.handleUsernameChange} onSubmit={this.handleTaskCreate}></TaskInput>
        <ProjectList projects={tasksToProjects(this.state.tasks)} showPerson={false}></ProjectList>
      </div>
    )
  }
})