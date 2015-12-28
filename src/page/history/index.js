/*
 * @file history page
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Task as TaskModel } from 'model'
import Footer from 'widget/footer'
import HistoryList from 'widget/history/list'
import Loading from 'widget/loading'
import delegator from 'mixin/delegator'

export default React.createClass ({

  mixins: [delegator],

  getInitialState: function () {
    return {
      histories: [],
      loading: false
    }
  },

  refreshHistories: function (noLoading) {
    let me = this

    if (!noLoading) {
      me.setState({
        loading: true
      })
    }

    TaskModel.distinct('week').then(function(weeks){
      me.setState({
        histories: weeks.sort((a, b) => (b - a)).map(week => ({ week })),
        loading: false
      })
    })
  },

  componentDidMount: function () {
    this.delegate(TaskModel, 'change', this.refreshHistories.bind(this, true))
    this.refreshHistories()
  },

  render: function () {
    let mainContent = this.state.loading
      ? <div className='loading-wrapper'><Loading /></div>
      : <HistoryList histories={this.state.histories} />

    return (
      <div className='main p-history'>
        {mainContent}
        <Footer />
      </div>
    )
  }

})
