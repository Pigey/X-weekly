/*
 * @file page: person in year
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import Loading from 'widget/loading'
import Graph from 'widget/graph'
import Footer from 'widget/footer'
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
      20,
      [
        '服务', '功能', '预览', '开发', '查看', '名单', '项目', '接入',
        '接入「', '学习', '增加', '拆分', '的bug', '页开发', '优化'
      ]
    )

    function createRandomItemStyle() {
      return {
        normal: {
          color: 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        }
      };
    }

    let graphOption = {
        title: {
            text: '关键词'
        },
        tooltip: {
            show: false
        },
        series: [{
            name: '关键词',
            type: 'wordCloud',
            size: ['80%', '80%'],
            textRotation : [0, 90],
            textPadding: 3,
            autoSize: {
                enable: true,
                minSize: 14
            },
            data: keywords.map(
              keyword => ({
                name: keyword.text,
                value: keyword.count * 100,
                itemStyle: createRandomItemStyle()
              })
            )
        }]
    }

    let mainContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <Graph className='keywords-graph' option={graphOption} />

    return (
      <div className='main p-person-year'>
        {mainContent}
        <Footer />
      </div>
    )
  }

})
