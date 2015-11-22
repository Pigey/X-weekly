/*
 * @file history page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Task as TaskModel } from 'model'
import HistoryList from 'widget/history/list'

export default React.createClass ({

  getInitialState: function () {
    return {
      histories: []
    };
  },

  refreshHistories: function () {
    let me = this

    TaskModel.distinct('week').then(function(weeks){
      me.setState({
        histories: weeks.sort((a, b) => (b - a)).map(week => ({ week }))
      })
    });
  },

  componentDidMount: function () {
    TaskModel.on('change', this.refreshHistories)
    this.refreshHistories()
  },

  render: function () {
    return (
      <div className='main'>
        <HistoryList histories={this.state.histories} />
      </div>
    )
  }

})
