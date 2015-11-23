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
      projects: [],
      showPerson: true,
      showRemove: true
    }
  },

  render: function () {
    let projects = this.props.projects.map(project => {
      return (
        <ProjectItem 
          key={project.name} 
          name={project.name} 
          tasks={project.tasks} 
          showPerson={this.props.showPerson} 
          showRemove={this.props.showRemove} />
      )
    })

    return (
      <ul className="w-project-list">
        {projects}
      </ul>
    )
  }
})
