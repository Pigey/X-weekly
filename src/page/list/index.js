/*
 * @file list page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import weeker from 'mixin/weeker'
import ProjectList from 'widget/project/list'
import Loading from 'widget/loading'
import { Task as TaskModel } from 'model'
import { formatDate, tasksToProjects, makeMailLink } from 'util'

export default React.createClass ({

  mixins: [weeker],

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

  getLinks: function (projects) {
    let plainContent = projects.map(project => {
        let tasks = project.tasks.map(
          (task, i) => `${i + 1}. ${task.cnt} （${task.status}） 【${task.person}】`
        ).join('\r\n\t')
        return `${project.name}：\r\n\r\n\t${tasks}`
    }).join('\r\n\r\n')

    let down = URL.createObjectURL(new Blob([plainContent]))
    let mail = makeMailLink({
      mailto: 'zuming@baidu.com',
      cc: 'csfe@baidu.com',
      subject: `糯米FE周报${formatDate(new Date())}`,
      body: plainContent
    })

    return { down, mail }
  },

  handleWeekChange: function(week) {
    this.refreshTasks({
      week: week
    })
  },

  componentDidMount: function () {
    TaskModel.on('change', this.refreshTasks.bind(this, null, true))
    this.refreshTasks()
  },

  render: function () {
    let projects = tasksToProjects(this.state.tasks)

    let links = this.getLinks(projects)
    let weekRange = this.getWeekRange()
    let [ beginDate, endDate ] = [ weekRange.begin, weekRange.end ].map(formatDate)
    let downloadName = `周报${beginDate}-${endDate}.txt`
    let operationLine = projects.length
      ? <h5 className='operation-line'>
          <a target='_blank' href={links.down} download={downloadName}>Download</a>
          <a target='_blank' href={links.mail}>Email</a>
        </h5>
      : ''

    let projectsContent = this.state.loading
      ? <Loading />
      : <ProjectList projects={projects} showRemove={false} />

    let finishedPersons = this.state.persons
    let finishedPersonLine = finishedPersons.length
      ? <p>已提交：{finishedPersons.join(' , ')}</p>
      : ''

    let unfinishedPersons = this.state.lastPersons.filter(
      person => finishedPersons.indexOf(person) < 0
    )
    let unfinishedPersonLine = unfinishedPersons.length
      ? <p>未提交：{unfinishedPersons.join(', ')}</p>
      : ''
    let personLine = this.state.loading
      ? ''
      : <div className='person-line'>
          {finishedPersonLine}
          {unfinishedPersonLine}
        </div>

    return (
      <div className='main p-list'>
        {operationLine}
        {projectsContent}
        {personLine}
      </div>
    )
  }

})
