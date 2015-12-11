/*
 * @file loading
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      theme: 'dark',
      className: ''
    }
  },

  render: function () {
    return (
      <div className={`w-loading theme-${this.props.theme} ${this.props.className}`}>
        <div className="cssload-thecube">
          <div className="cssload-cube cssload-c1"></div>
          <div className="cssload-cube cssload-c2"></div>
          <div className="cssload-cube cssload-c4"></div>
          <div className="cssload-cube cssload-c3"></div>
        </div>
      </div>
    )
  }
})
