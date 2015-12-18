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
import RouteCSSTransitionGroup from 'widget/route-css-transition-group'

/*class App extends React.Component {
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
    </Route>
  </Router>
), document.getElementById('app-container'))*/

import extract from 'util/extract-keyword'
import { Task as TaskModel } from 'model'

TaskModel.list().then(list => {
  console.log(extract(
    list.map(item => item.cnt),
    ['服务', '功能', '预览', '开发', '查看', '名单', '项目', '接入', '接入「', '学习', '增加', '拆分', '的bug', '页开发']
  ))
})
