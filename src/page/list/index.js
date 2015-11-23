/*
 * @file list page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import weeker from 'mixin/weeker'
import ProjectList from 'widget/project/list'
import { Task as TaskModel } from 'model'
import { formatDate, tasksToProjects, makeMailLink } from 'widget/util'

export default React.createClass ({

  mixins: [weeker],

  getInitialState: function () {
    return {
      tasks: [],
      persons: [],
      lastPersons: []
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
    TaskModel.on('change', this.refreshTasks.bind(this, null))
    this.refreshTasks()
  },

  render: function () {
    let projects = tasksToProjects(this.state.tasks)
    let links = this.getLinks(projects)

    let finishedPersons = this.state.persons
    let unfinishedPersons = this.state.lastPersons.filter(
      person => finishedPersons.indexOf(person) < 0
    )

    return (
      <div className='main p-list'>
        <h5 className='operation-line'>
          <a target='_blank' href={links.mail}>Email</a>
          <a target='_blank' href={links.down}>Download</a>
        </h5>
        <ProjectList projects={projects} showRemove={false} />
        <div className='person-line'>
          <p>已提交：{finishedPersons.join(', ')}</p>
          <p>未提交：{unfinishedPersons.join(', ')}</p>
        </div>
      </div>
    )
  }

})
