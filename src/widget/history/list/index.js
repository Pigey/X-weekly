/*
 * @file history list
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import HistoryItem from '../item'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      histories: []
    }
  },

  render: function () {
    let histories = this.props.histories.map(history => {
      return (
        <HistoryItem key={history.week} week={history.week} />
      )
    })

    return (
      <ul className="w-history-list">
        {histories}
      </ul>
    )
  }
})
