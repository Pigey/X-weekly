/*
 * @file project list
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import ProjectItem from '../item'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      projects: []
    }
  },

  render: function () {
    let projects = this.props.projects

    let projectsContent = projects.length
      ? projects.map(project => {
        return (
          <ProjectItem 
            key={project.name} 
            name={project.name} 
            tasks={project.tasks}
          />
        )
      })
      : <p className="no-record">无记录</p>

    return (
      <ul className="w-project-list">
        {projectsContent}
      </ul>
    )
  }
})
