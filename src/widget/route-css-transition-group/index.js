/*
 * @file css transition group for route
 * @author nighca <nighca@live.cn>
 */

import React from 'react'
import StaticContainer from 'react-static-container'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default React.createClass ({

  contextTypes: {
    location: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      previousPathname: null
    }
  },

  componentWillReceiveProps: function (nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ previousPathname: this.context.location.pathname })

      if (nextProps.order) {
        let [ pos, nextPos ] = [ this.props, nextProps ]
          .map(props => (props.children.props.route.path || ''))
          .map(path => nextProps.order.indexOf(path))

        this.setState({
          order: nextPos === pos
            ? 'flat'
            : (
              nextPos > pos
              ? 'ascending'
              : 'descending'
            )
        })
      }
    }
  },

  componentDidUpdate: function () {
    if (this.state.previousPathname) {
      this.setState({ previousPathname: null })
    }
  },

  render: function () {
    const { children, ...props } = this.props
    const { previousPathname, order } = this.state

    if (order) {
      props.transitionName = `${order}-order-${props.transitionName}`
    }

    return (
      <ReactCSSTransitionGroup {...props}>
        <StaticContainer
          key={previousPathname || this.context.location.pathname}
          shouldUpdate={!previousPathname}
        >
          {children}
        </StaticContainer>
      </ReactCSSTransitionGroup>
    )
  }
})
