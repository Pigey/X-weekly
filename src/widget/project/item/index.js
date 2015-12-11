/*
 * @file project item
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import TaskList from 'widget/task/list'
import IconTag from './img/tag.svg'

export default React.createClass ({
  getDefaultProps: function () {
    return {
      name: '',
      tasks: []
    }
  },

  render: function () {
    return (
      <li className="w-project-item">
        <h5 className="project-name">{this.props.name}<IconTag className="icon" /></h5>
        <TaskList tasks={this.props.tasks} />
      </li>
    )
  }
})
