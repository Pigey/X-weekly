/*
 * @file person-line
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { getWeek, getWeekRange, makeMailLink, formatDate } from 'util'

export default React.createClass ({
  getDefaultProps: function () {
    return {
      persons: [],
      lastPersons: []
    }
  },

  render: function () {
    let finishedPersons = this.props.persons
    let finishedPersonLine = finishedPersons.length
      ? <p>已提交：{finishedPersons.join(' , ')}</p>
      : ''

    let unfinishedPersons = this.props.lastPersons.filter(
      person => finishedPersons.indexOf(person) < 0
    )
    let unfinishedPersonLine = unfinishedPersons.length
      ? <p>未提交：{unfinishedPersons.join(', ')}</p>
      : ''

    return (
      <div className='w-person-line'>
        {finishedPersonLine}
        {unfinishedPersonLine}
      </div>
    )
  }
})
