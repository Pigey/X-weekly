/*
 * @file app main file
 * @author nighca <nighca@live.cn>
 */

import 'babel-polyfill'

import './widget/global'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import Header from 'widget/header'
import Home from 'page/home'
import List from 'page/list'
import History from 'page/history'
import RouteCSSTransitionGroup from 'widget/route-css-transition-group'

class App extends React.Component {
  render() {
    const order = [ '', 'home', 'list', 'history' ]

    return (
      <div>
        {this.props.header}
        <RouteCSSTransitionGroup 
          component="div" 
          transitionName="slide" 
          transitionEnterTimeout={300} 
          transitionLeaveTimeout={300} 
          order={order}>
          {this.props.main}
        </RouteCSSTransitionGroup>
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
