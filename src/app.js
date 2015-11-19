/*
 * @file app main file
 * @author nighca <nighca@live.cn>
 */

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
        <Header></Header>
        {this.props.children}
        <Footer></Footer>
      </div>
    )
  }
}

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="list" component={List} />
      <Route path="history" component={History} />
    </Route>
  </Router>
), document.getElementById('app-container'))
