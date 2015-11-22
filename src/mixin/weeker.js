/*
 * @file weeker mixin
 * @author nighca <nighca@live.cn>
 */

import { getWeek } from 'widget/util'

export default {

  getWeek: function (props) {
    props = props || this.props
    return getWeek(props.params && props.params.week)
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
