/*
 * @file history item
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Link } from 'react-router'
import { toLen, getWeekRange } from 'widget/util'

export default React.createClass ({
  getDefaultProps: function () {
    return {
      week: 0
    }
  },

  render: function () {
    let week = this.props.week
    let { begin, end } = getWeekRange(week)

    let formatDate = function (date, role) {
      let y = toLen(date.getFullYear(), 4)
      let m = toLen(date.getMonth() + 1, 2)
      let d = toLen(date.getDate(), 2)
      return (
        <span className={`week-${role}`}>
          <span className='year'>{y}</span>
          <span className='date'>{m} . {d}</span>
        </span>
      )
    }

    return (
      <li className="w-history-item">
        <Link to={`list/${week}`}>
          {formatDate(begin, 'begin')}
          <span className='sep'>-</span>
          {formatDate(end, 'end')}
        </Link>
      </li>
    )
  }
})
