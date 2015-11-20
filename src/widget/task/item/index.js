/*
 * @file task item
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Task as TaskModel } from 'model'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      imgs: []
    }
  },

  handleRemove: function () {
    TaskModel.remove({
      _id: this.props._id
    })
  },

  render: function () {
    let imgs = this.props.imgs.map(img => <img src={img} />)

    return (
      <li className='w-task-item'>
        <span className="task-num">{this.props.index + 1}. </span>
        <p className="task-cnt">{this.props.cnt}</p>
        <span className="task-status">[{this.props.status}]</span>
        <span className="task-person">{this.props.person}</span>
        <span className="op-remove" onClick={this.handleRemove}>X</span>
        <p className="task-img-line">
          {imgs}
        </p>
      </li>
    )
  }
})
