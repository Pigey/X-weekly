/*
 * @file home page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Link } from 'react-router'

import ProjectList from 'widget/project/list'
import TaskInput from 'widget/task/input'
import OccupiedInput from 'widget/occupied/input'
import Loading from 'widget/loading'
import Footer from 'widget/footer'

import delegator from 'mixin/delegator'
import weeker from 'mixin/weeker'
import tag from 'mixin/tag'

import {
  Project as ProjectModel,
  Status as StatusModel,
  Task as TaskModel,
  Occupied as OccupiedModel
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
      occupied: null,
      loading: false
    }
  },

  childContextTypes: {
    isOwner: React.PropTypes.bool
  },

  getChildContext: function() {
    return {
      isOwner: true
    }
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

  refreshOccupied: function (params) {
    const name = 'occupied'
    const tag = this.createTag(name)

    let me = this

    return OccupiedModel.get(
      Object.assign({
        week: this.getWeek(),
        person: this.state.username
      }, params)
    ).then(function (occupied) {
      if (!me.validateTag(name, tag)) {
        return
      }

      me.setState({
        [name]: occupied
      })
    })
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
    let params = { week: week }
    this.refreshTasks(params)
    this.refreshOccupied(params)
  },

  componentDidMount: function () {
    this.delegate(ProjectModel, 'change', this.refreshProjects)
    this.delegate(StatusModel, 'change', this.refreshStatuses)
    this.delegate(OccupiedModel, 'change', this.refreshOccupied.bind(this, null))
    this.delegate(TaskModel, 'change', this.refreshTasks.bind(this, null, true))

    this.refreshProjects()
    this.refreshStatuses()
    this.refreshOccupied()
    this.refreshTasks()
  },

  handleUsernameChange: function (username) {
    let me = this
    this.setState({ username }, () => {
      me.refreshTasks()
      me.refreshOccupied()
    })

    localStorage.username = username
  },

  handleTaskCreate: function (task) {
    return TaskModel.create(Object.assign(task, {
      week: this.getWeek()
    }))
  },

  handleOccupiedLevelSet: function (level) {
    if (!this.state.username) {
      return Promise.reject('Username required!')
    }

    if (this.state.occupied) {
      return OccupiedModel.update(
        { _id: this.state.occupied._id },
        { level: level }
      )
    }

    return OccupiedModel.create({
      person: this.state.username,
      week: this.getWeek(),
      level: level
    })
  },

  estimateOccupiedLevel: function () {
    return Math.min(this.state.tasks.length, 5) + ''
  },

  render: function () {
    let projects = sortBy(
      this.state.projects,
      PROJECT_SEQUENCE,
      'name'
    )

    let projectsWithTask = tasksToProjects(this.state.tasks)

    let projectsContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <ProjectList projects={projectsWithTask}></ProjectList>

    let savedOccupiedLevel = this.state.occupied && this.state.occupied.level
    let occupiedLevel = savedOccupiedLevel || this.estimateOccupiedLevel()

    let yearLink = this.state.username
      ? <div className='addon-block'>
        <Link className='year-link' to={`/person/${this.state.username}/year/2015`}>
          {`查看我的 2015`}
        </Link>
      </div>
      : ''

    return (
      <div className='main p-home'>
        <TaskInput person={this.state.username} projects={projects} statuses={this.state.statuses} onPersonChange={this.handleUsernameChange} onSubmit={this.handleTaskCreate}></TaskInput>
        <OccupiedInput value={occupiedLevel} saved={savedOccupiedLevel} onSubmit={this.handleOccupiedLevelSet} />
        {projectsContent}
        <Footer />
      </div>
    )
  }
})
