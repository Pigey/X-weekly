/*
 * @file header
 * @author nighca <nighca@live.cn>
 */

import './index.less'

import React from 'react'
import { Link, IndexLink } from 'react-router'

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className='inner-header'>
          <h1 className='title'>
            <Link to='./index.html'>
              WEEKLY
              <span className='sub-title'></span>
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
}

export default Header
