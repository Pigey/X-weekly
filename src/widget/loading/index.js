/*
 * @file loading
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

export default React.createClass ({
  render: function () {
    return (
      <div className='w-loading'>
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
