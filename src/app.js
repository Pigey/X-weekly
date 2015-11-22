/*
 * @file app main file
 * @author nighca <nighca@live.cn>
 */

import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import './widget/global'

import Header from './widget/header'
import Footer from './widget/footer'
import Home from './page/home'
import List from './page/list'
import History from './page/history'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.header}
        {this.props.main}
        <Footer></Footer>
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
