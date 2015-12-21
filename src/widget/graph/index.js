/**
 * @file graph
 * @author nighca<nighca@live.cn>
 */

import React from 'react'
import ReactDOM from 'react-dom'

let load

function loadEcharts () {
  load = load || new Promise((resolve, reject) => {
    let script = Object.assign(
      document.createElement('script'),
      {   
        charset: 'utf-8',
        async: true,
        src: 'http://echarts.baidu.com/build/dist/echarts-all.js',
        onload: () => { resolve(window.echarts) },
        onerror: reject
      }
    )

    document.head.appendChild(script)
  })

  return load
}

export default React.createClass ({

  getDefaultProps: function () {
    return {
      option: null,
      className: ''
    }
  },

  componentDidMount: function () {
    console.log(this.props.option)
    loadEcharts().then(echarts => {
      echarts.init(ReactDOM.findDOMNode(this)).setOption(this.props.option)
    })
  },

  render: function () {

    let className = 'w-graph'
      + (
        this.props.className
        ? ' ' + this.props.className
        : ''
      )

    return (
      <div className={className}>
      </div>
    )
  }

})
