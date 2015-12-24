/**
 * @file graph - task keywords
 * @author nighca<nighca@live.cn>
 */

import React from 'react'
import Graph from 'widget/graph'
import extract from 'util/extract-keyword'

export default React.createClass ({

  getDefaultProps: function () {
    return {
      tasks: []
    }
  },

  render: function () {

    let keywords = extract(
      this.props.tasks.map(item => item.cnt),
      20,
      [
        '服务', '功能', '预览', '开发', '查看', '名单', '项目', '接入',
        '接入「', '学习', '增加', '拆分', '的bug', '页开发', '优化'
      ]
    )

    function createRandomItemStyle() {
      return {
        normal: {
          color: 'rgba(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.random() / 2 + .3
          ].join(',') + ')'
        }
      };
    }

    let graphOption = {
      tooltip : {
        show: true,
        formatter: function (info) {
          let word = info[1]
          let count = info[2] / 100
          return `${count} 次周报提到`
        }
      },
      series: [{
        name: '关键词',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : [0, 90],
        textPadding: 3,
        itemStyle: {
          normal: {
            textStyle: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica, arial, "Helvetica Neue", Helvetica, arial, "Source Han Sans", "Microsoft YaHei", sans-serif'
            }
          }
        },
        autoSize: {
          enable: true,
          minSize: 12
        },
        data: keywords.map(
          keyword => ({
            name: keyword.text,
            value: keyword.count * 100,
            itemStyle: createRandomItemStyle()
          })
        )
      }]
    }

    return (
      <Graph className={this.props.className} option={graphOption} />
    )
  }

})
