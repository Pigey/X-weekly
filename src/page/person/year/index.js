/*
 * @file page: person in year
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import Footer from 'widget/footer'
import Loading from 'widget/loading'
import { Task as TaskModel } from 'model'
import delegator from 'mixin/delegator'
import extract from 'util/extract-keyword'
import { getRangeWeek } from 'util'

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
    let keywords = extract(
      this.state.tasks.map(item => item.cnt),
      10,
      [
        '服务', '功能', '预览', '开发', '查看', '名单', '项目', '接入',
        '接入「', '学习', '增加', '拆分', '的bug', '页开发', '优化'
      ]
    )

    let mainContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <p>{keywords.join(', ')}</p>

    return (
      <div className='main p-person-year'>
        {mainContent}
        <Footer />
      </div>
    )
  }

})
