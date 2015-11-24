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
      imgs: [],
      showPerson: true,
      showRemove: true
    }
  },

  handleRemove: function () {
    TaskModel.remove({
      _id: this.props._id
    })
  },

  render: function () {
    let { showPerson, showRemove } = this.props
    let className = `w-task-item${showPerson ? '' : ' no-person'}${showRemove ? '' : ' no-remove'}`

    let imgs = this.props.imgs.map(img => <img src={img} />)
    let imgLine = this.props.imgs.length
      ? <p className="task-img-line">
          {imgs}
        </p>
      : ''

    // hide img line temparorily
    imgLine = ''

    return (
      <li className={className}>
        <p className="task-cnt">{this.props.cnt}</p>
        <p className="task-info">
          <span className="task-status">{this.props.status}</span>
          <span className="task-person">, {this.props.person}</span>
        </p>
        <a href="javascript:;" className="op-remove" onClick={this.handleRemove}>X</a>
        {imgLine}
      </li>
    )
  }
})
