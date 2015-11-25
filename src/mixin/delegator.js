/*
 * @file delegator mixin
 * @author nighca <nighca@live.cn>
 */

const DELEGATES = Symbol('delegates')

export default {

  getDelegates: function () {
    return this[DELEGATES] = this[DELEGATES] || []
  },

  delegate: function (target, event, handler) {
    target.on(event, handler)
    this.getDelegates().push({ target, event, handler })
  },

  componentWillUnmount: function () {
    this.getDelegates().forEach(function ({ target, event, handler }) {
      target.off(event, handler)
    })
  }

}
