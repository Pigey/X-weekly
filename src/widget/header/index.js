/*
 * @file header
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Link, IndexLink } from 'react-router'

import weeker from 'mixin/weeker'
import { getWeekRange, formatDate } from 'widget/util'

export default React.createClass ({

  mixins: [weeker],

  render: function () {
    let week = this.getWeek()
    let monday = formatDate(getWeekRange(week).begin)

    return (
      <header className='w-header'>
        <div className='inner-header'>
          <h1 className='title'>
            <Link to='/'>
              WEEKLY
              <span className='sub-title'>{monday}</span>
            </Link>
            <p className='side-link-list'>
              <IndexLink className='side-link' activeClassName='active' to='/'>HOME</IndexLink>
              <Link className='side-link' activeClassName='active' to='/list'>LIST</Link>
              <Link className='side-link' activeClassName='active' to='/history'>HISTORY</Link>
            </p>
          </h1>
        </div>
      </header>
    )
  }

})
