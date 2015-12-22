/**
 * @file graph - task in projects
 * @author nighca<nighca@live.cn>
 */

import React from 'react'
import Graph from 'widget/graph'
import { tasksToProjects } from 'util'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      tasks: []
    }
  },

  getOption: function () {
    let projects = tasksToProjects(this.props.tasks)

    let labelTop = {
      normal: {
        label: {
          show: true,
          position: 'center',
          formatter: '{b}',
          textStyle: {
            baseline: 'bottom'
          }
        },
        labelLine: {
          show: false
        }
      }
    }

    let labelFromatter = {
      normal: {
        label: {
          formatter: function (params){
            return 100 - params.value + '%'
          },
          textStyle: {
            baseline: 'top'
          }
        }
      },
    }

    let labelBottom = {
      normal: {
        color: '#ccc',
        label: {
          show: true,
          position: 'center'
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: 'rgba(0,0,0,0)'
      }
    }

    let radius = [40, 55]

    return {
      legend: {
        x: 'center',
        y: 'center',
        data: projects.map(project => project.name)
      },
      series: projects.map(
        (project, index) => {
          let percent = Math.round(project.tasks.length / this.props.tasks.length * 100)
          return {
            type: 'pie',
            center: [120 * (index + .5) + '', '80'],
            radius: radius,
            itemStyle: labelFromatter,
            data: [
              { name: 'other', value: 100 - percent, itemStyle: labelBottom },
              { name: project.name, value: percent, itemStyle: labelTop }
            ]
          }
        }
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
