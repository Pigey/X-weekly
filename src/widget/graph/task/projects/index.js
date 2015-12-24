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

    return {
      tooltip: {
        trigger: 'item',
        formatter: "{c} 次周报提到 ({d}%)"
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: projects.map(project => project.name)
      },
      series: [
        {
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '50%'],
          roseType: 'area',
          data: projects.map(
            project => ({
              value: project.tasks.length,
              name: project.name
            })
          )
        }
      ]
    }

  },

  render: function () {
    let graphOption = this.getOption()
    return (
      <Graph className={this.props.className} option={graphOption} />
    )
  }

})
