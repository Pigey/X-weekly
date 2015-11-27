/*
 * @file app main file
 * @author nighca <nighca@live.cn>
 */

import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './widget/global'

import Header from './widget/header'
import Home from './page/home'
import List from './page/list'
import History from './page/history'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.header}
        <ReactCSSTransitionGroup 
          component="div" 
          transitionName="slide" 
          transitionEnterTimeout={500} 
          transitionLeaveTimeout={500}>
          {this.props.main && React.cloneElement(this.props.main, {
            key: this.props.main.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute components={{ header: Header, main: Home }} />

      <Route path="home" components={{ header: Header, main: Home }}>
        <Route path=":week" />
      </Route>

      <Route path="list" components={{ header: Header, main: List }}>
        <Route path=":week" />
      </Route>

      <Route path="history" components={{ header: Header, main: History }} />
    </Route>
  </Router>
), document.getElementById('app-container'))
