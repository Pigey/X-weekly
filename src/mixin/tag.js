/*
 * @file tag mixin
 * @author nighca <nighca@live.cn>
 */

const TAGS = Symbol('tags')

export default {

  getTags: function () {
    return this[TAGS] = this[TAGS] || {}
  },

  createTag: function (field) {
    return this.getTags()[field] = Symbol()
  },

  validateTag: function (field, tag) {
    return this.getTags()[field] === tag
  }

}
