/*
 * @file general tooltip
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'

export default ({ children, className, tip }) => {
  return (
    <div className={`w-tooltip ${className}`}>
      <span className='tip'>{tip}</span>
      {children}
    </div>
  )
}
