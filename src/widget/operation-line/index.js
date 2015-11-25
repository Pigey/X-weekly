/*
 * @file operation-line
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { getWeek, getWeekRange, makeMailLink, formatDate } from 'util'

export default React.createClass ({
  getDefaultProps: function () {
    return {
      week: null,
      projects: []
    }
  },

  getLinks: function () {
    let plainContent = this.props.projects.map(project => {
        let tasks = project.tasks.map(
          (task, i) => `${i + 1}. ${task.cnt} （${task.status}） 【${task.person}】`
        ).join('\r\n\t')
        return `${project.name}：\r\n\r\n\t${tasks}`
    }).join('\r\n\r\n')

    let down = URL.createObjectURL(new Blob([plainContent]))
    let mail = makeMailLink({
      mailto: 'zuming@baidu.com',
      cc: 'csfe@baidu.com',
      subject: `糯米FE周报${formatDate(new Date())}`,
      body: plainContent
    })

    return { down, mail }
  },

  render: function () {
    let links = this.getLinks()

    let { begin, end } = getWeekRange(getWeek(this.props.week))
    let fileName = `周报${formatDate(begin)}-${formatDate(end)}.txt`

    return (
      <h5 className='w-operation-line'>
        <a target='_blank' href={links.down} download={fileName}>Download</a>
        <a target='_blank' href={links.mail}>Email</a>
      </h5>
    )
  }
})
