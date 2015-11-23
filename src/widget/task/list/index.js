/*
 * @file task list
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import TaskItem from '../item'

export default React.createClass ({
  getDefaultProps: function () {
    return {
      tasks: [],
      showPerson: true,
      showRemove: true
    }
  },

  render: function () {
    let tasks = this.props.tasks.map((task, index) => {
      return (
        <TaskItem 
          key={task._id} 
          index={index} 
          showPerson={this.props.showPerson} 
          showRemove={this.props.showRemove} 
          {...task} />
      )
    })

    return (
      <ul className='w-task-list'>
        {tasks}
      </ul>
    )
  }
})
