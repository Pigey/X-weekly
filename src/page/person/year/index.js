/*
 * @file page: person in year
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import Loading from 'widget/loading'
import GraphTaskKeywords from 'widget/graph/task/keywords'
import GraphTaskProjects from 'widget/graph/task/projects'
import GraphTaskTimeline from 'widget/graph/task/timeline'
import Footer from 'widget/footer'
import { Task as TaskModel } from 'model'
import delegator from 'mixin/delegator'
import { getRangeWeek, getArray } from 'util'

export default React.createClass ({

  mixins: [delegator],

  getDefaultProps: function () {
    return {
      params: {}
    }
  },

  getInitialState: function () {
    return {
      tasks: [],
      loading: false
    }
  },

  refreshTasks: function (params) {
    let me = this
    let { person, year } = params || this.props.params
    let { begin, end } = getRangeWeek(parseInt(year, 10))

    me.setState({
      loading: true
    })

    TaskModel.list({
      person: person,
      week: { $gte: begin, $lte: end }
    }).then(tasks => {
      me.setState({
        loading: false,
        tasks
      })
    })

  },

  componentDidMount: function () {
    this.delegate(TaskModel, 'change', this.refreshTasks.bind(this, null))
    this.refreshTasks()
  },

  componentWillReceiveProps: function(nextProps) {
    this.refreshTasks(nextProps.params)
  },

  render: function () {

    let { begin, end } = getRangeWeek(parseInt(this.props.params.year, 10))
    let weeks = getArray(begin, end)

    let mainContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <div>
          <h4 className='graph-title'>年度关键词</h4>
          <GraphTaskKeywords className='keywords-graph' tasks={this.state.tasks} />
          <h4 className='graph-title'>所有项目</h4>
          <GraphTaskProjects className='projects-graph' tasks={this.state.tasks} />
          <h4 className='graph-title'>每周统计</h4>
          <GraphTaskTimeline className='timeline-graph' tasks={this.state.tasks} weeks={weeks} />
        </div>

    return (
      <div className='main p-person-year'>
        {mainContent}
        <Footer />
      </div>
    )
  }

})
