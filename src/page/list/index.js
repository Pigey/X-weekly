/*
 * @file list page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import weeker from 'mixin/weeker'
import delegator from 'mixin/delegator'

import { Task as TaskModel } from 'model'
import { tasksToProjects } from 'util'

import OperationLine from 'widget/operation-line'
import ProjectList from 'widget/project/list'
import PersonLine from 'widget/person-line'
import Loading from 'widget/loading'

export default React.createClass ({

  mixins: [weeker, delegator],

  getInitialState: function () {
    return {
      tasks: [],
      persons: [],
      lastPersons: [],
      loading: false
    };
  },

  refreshTasks: function (params, noLoading) {
    let me = this

    params = Object.assign({
      week: this.getWeek()
    }, params)

    if (!noLoading) {
      me.setState({
        loading: true
      })
    }

    TaskModel.list(params).then(function (list) {
      me.setState({
        tasks: list,
        loading: false
      })
    })

    TaskModel.distinct('person', params).then(function (list) {
      me.setState({
        persons: list
      })
    })

    TaskModel.distinct(
      'person',
      Object.assign({}, params, {
        week: params.week - 1
      })
    ).then(function (list) {
      me.setState({
        lastPersons: list
      })
    })
  },

  handleWeekChange: function(week) {
    this.refreshTasks({
      week: week
    })
  },

  componentDidMount: function () {
    this.delegate(TaskModel, 'change', this.refreshTasks.bind(this, null, true))
    this.refreshTasks()
  },

  render: function () {
    let projects = tasksToProjects(this.state.tasks)

    let operationLine = projects.length
      ? <OperationLine projects={projects} week={this.getWeek()} />
      : ''

    let projectsContent = this.state.loading
      ? <Loading />
      : <ProjectList projects={projects} showRemove={false} />

    let personLine = this.state.loading
      ? ''
      : <PersonLine persons={this.state.persons} lastPersons={this.state.lastPersons} />

    return (
      <div className='main p-list'>
        {operationLine}
        {projectsContent}
        {personLine}
      </div>
    )
  }

})
