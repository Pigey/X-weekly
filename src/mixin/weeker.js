/*
 * @file weeker mixin
 * @author nighca <nighca@live.cn>
 */

import { getWeek, getWeekRange } from 'util'

export default {

  getWeek: function (props) {
    props = props || this.props
    return getWeek(props.params && props.params.week)
  },

  getWeekRange: function (props) {
    return getWeekRange(this.getWeek(props))
  },

  componentWillReceiveProps: function(nextProps) {
    let newWeek = this.getWeek(nextProps)

    if (
      this.getWeek() !== newWeek
      && this.handleWeekChange
    ) {
      this.handleWeekChange(newWeek)
    }
  },

}
