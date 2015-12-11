/*
 * @file list page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import weeker from 'mixin/weeker'
import delegator from 'mixin/delegator'

import { Task as TaskModel, Occupied as OccupiedModel } from 'model'
import { OCCUPIED_LEVEL_LIST, tasksToProjects } from 'util'

import OperationLine from 'widget/operation-line'
import ProjectList from 'widget/project/list'
import OccupiedList from 'widget/occupied/list'
import PersonLine from 'widget/person-line'
import Loading from 'widget/loading'
import Footer from 'widget/footer'

export default React.createClass ({

  mixins: [weeker, delegator],

  getInitialState: function () {
    return {
      tasks: [],
      persons: [],
      occupiedList: [],
      lastPersons: [],
      loading: false
    };
  },

  refreshOccupiedList: function (params) {
    let me = this

    params = Object.assign({
      week: this.getWeek()
    }, params)

    OccupiedModel.list(params).then(function (occupiedList) {
      me.setState({
        occupiedList: occupiedList
      })
    })
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
    let params = { week: week }

    this.refreshTasks(params)
    this.refreshOccupiedList(params)
  },

  componentDidMount: function () {
    this.delegate(TaskModel, 'change', this.refreshTasks.bind(this, null, true))
    this.delegate(OccupiedModel, 'change', this.refreshOccupiedList.bind(this, null))

    this.refreshTasks()
    this.refreshOccupiedList()
  },

  render: function () {
    let projects = tasksToProjects(this.state.tasks)

    let operationLine = projects.length
      ? <OperationLine projects={projects} week={this.getWeek()} />
      : ''

    let projectsContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <ProjectList projects={projects} />

    let occupiedList = OCCUPIED_LEVEL_LIST.map((item) => {
      return {
        level: item,
        persons: this.state.occupiedList.filter(
          occupied => (occupied.level === item.value)
        ).map(
          occupied => occupied.person
        )
      }
    })

    let occupiedContent = this.state.occupiedList.length
      ? <div className="occupied-content">
          <OccupiedList list={occupiedList} />
        </div>
      : ''

    let personLine = this.state.loading
      ? ''
      : <PersonLine persons={this.state.persons} lastPersons={this.state.lastPersons} />

    return (
      <div className='main p-list'>
        <div className='list-main'>
          {operationLine}
          {projectsContent}
          {occupiedContent}
          {personLine}
        </div>
        <Footer />
      </div>
    )
  }

})
