/*
 * @file X
 * @author nighca <nighca@live.cn>
 */

import config from 'config/x.json'
import X from 'x-client/browser'

export default new Promise((resolve, reject) => {
  X
    .connect(config.server)
    .config({
      token:config.token
    })

  resolve(X)
})