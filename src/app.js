/*
 * @file app main file
 * @author nighca <nighca@live.cn>
 */

import 'babel-polyfill'

import './app.less'
import './widget/global'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import Header from 'widget/header'
import Home from 'page/home'
import List from 'page/list'
import History from 'page/history'
import PersonYear from 'page/person/year'
import RouteCSSTransitionGroup from 'widget/route-css-transition-group'

import Favico from 'favico.js'

new Favico().image(
  Object.assign(
    new Image(),
    { src: 'http://lab.ejci.net/favico.js/html5logo.png' }
  )
)

class App extends React.Component {
  render() {
    const useAnimation = false

    const main = useAnimation
      ? <RouteCSSTransitionGroup 
          component="div" 
          transitionName="slide" 
          transitionEnterTimeout={400} 
          transitionLeaveTimeout={400} 
          order={[ '', 'home', 'list', 'history' ]}>
          {this.props.main}
        </RouteCSSTransitionGroup>
      : this.props.main

    return (
      <div>
        {this.props.header}
        {main}
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

      <Route path="person">
        <Route path=":person/year/:year" components={{ header: Header, main: PersonYear }} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app-container'))
