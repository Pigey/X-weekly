/*
 * @file home page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import ProjectList from 'widget/project/list'
import TaskInput from 'widget/task/input'

class Home extends React.Component {
  render() {
    return (
      <div className='main'>
        <TaskInput></TaskInput>
        <ProjectList></ProjectList>
      </div>
    )
  }
}

export default Home
