/*
 * @file occupied list
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      list: []
    }
  },

  render: function () {
    let occupiedList = this.props.list

    let occupiedListContent = occupiedList.filter(
      occupied => occupied.persons.length
    ).map(occupied => {
      let { level, persons } = occupied
      return (
        <li key={level.value} className="occupied-line">
          <span className="occupied-person">{persons.join(' , ')}</span>
          <span className="occupied-level">{level.desc}</span>
        </li>
      )
    })

    let content = occupiedList.length
      ? [
          <li key="0" className="occupied-line">
            本周
          </li>
        ].concat(occupiedListContent)
      : <p className="no-record">无记录</p>

    return (
      <ul className="w-occupied-list">
        {content}
      </ul>
    )
  }
})
