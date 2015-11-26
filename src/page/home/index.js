/*
 * @file home page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import ProjectList from 'widget/project/list'
import TaskInput from 'widget/task/input'
import Loading from 'widget/loading'
import delegator from 'mixin/delegator'
import weeker from 'mixin/weeker'
import tag from 'mixin/tag'

import {
  Project as ProjectModel,
  Status as StatusModel,
  Task as TaskModel
} from 'model'

import { PROJECT_SEQUENCE, sortBy, tasksToProjects } from 'util'

export default React.createClass ({

  mixins: [delegator, weeker, tag],

  getInitialState: function () {
    return {
      username: localStorage.username || '',
      projects: [],
      statuses: [],
      tasks: [],
      loading: false
    };
  },

  refreshModel: function (model, name, params) {
    const tag = this.createTag(name)

    let me = this

    return model.list(params).then(function (list) {
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

  refreshTasks: function (params, noLoading) {
    let me = this

    if (!noLoading) {
      me.setState({
        loading: true
      })
    }

    this.refreshModel(
      TaskModel,
      'tasks',
      Object.assign({
        week: this.getWeek(),
        person: this.state.username
      }, params)
    ).then(function () {
      me.setState({
        loading: false
      })
    })
  },

  handleWeekChange: function(week) {
    this.refreshTasks({
      week: week
    })
  },

  componentDidMount: function () {
    this.delegate(ProjectModel, 'change', this.refreshProjects)
    this.delegate(StatusModel, 'change', this.refreshStatuses)
    this.delegate(TaskModel, 'change', this.refreshTasks.bind(this, null, true))

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
    let projects = sortBy(
      this.state.projects,
      PROJECT_SEQUENCE,
      'name'
    )

    let projectsWithTask = tasksToProjects(this.state.tasks)

    let projectsContent = this.state.loading
      ? <Loading />
      : <ProjectList projects={projectsWithTask} showPerson={false}></ProjectList>

    return (
      <div className='main p-home'>
        <TaskInput person={this.state.username} projects={projects} statuses={this.state.statuses} onPersonChange={this.handleUsernameChange} onSubmit={this.handleTaskCreate}></TaskInput>
        {projectsContent}
      </div>
    )
  }
})
