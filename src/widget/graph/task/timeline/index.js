/**
 * @file graph - task timeline
 * @author nighca<nighca@live.cn>
 */

import React from 'react'
import Graph from 'widget/graph'
import { tasksToProjects, getWeekRange, formatDate } from 'util'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      weeks: [],
      tasks: []
    }
  },

  getOption: function () {
    let projects = tasksToProjects(this.props.tasks)

    let weeks = this.props.weeks.reverse().map(week => ({
      id: week,
      ...getWeekRange(week)
    }))

    return {
      legend: {
        y: 'top',
        data: projects.map(project => project.name)
      },
      xAxis: [
        {
          name: '周报提到次数',
          type: 'value',
          position: 'top'
        }
      ],
      yAxis: [
        {
          name: '周',
          type: 'category',
          data: weeks.map(
            week => formatDate(week.begin).slice(-5) + '-' + formatDate(week.end).slice(-5)
          )
        }
      ],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      series: projects.map(
        project => ({
          name: project.name,
          type:'bar',
          barWidth: 20,
          stack: '总量',
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{a}',
                position: 'insideLeft'
              }
            }
          },
          data: weeks.map(
            week => project.tasks.filter(
              task => task.week === week.id
            ).length || '-'
          )
        })
      )
    }

  },

  render: function () {
    let graphOption = this.getOption()
    return (
      <Graph className={this.props.className} option={graphOption} />
    )
  }

})
