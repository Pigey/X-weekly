/*
 * @file task input
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <div className="task-input">
        <div className="line">
          <input type="text" className="person-in" placeholder="姓名" value=""></input>
          <select className="project-in"></select>
        </div>
        <div className="line">
          <input type="text" className="task-in" placeholder="内容" value=""></input>
          <select className="status-in"></select>
        </div>
        <button className="submit">添加</button>
      </div>
    )
  }
}

export default Footer

