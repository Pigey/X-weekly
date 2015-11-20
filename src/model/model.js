/*
 * @file class Model
 * @author nighca <nighca@live.cn>
 */

import X from './x'

export default class Model {

  static get modelName() {
    return 'default'
  }

  static get model() {
    let modelName = this.modelName
    return X.then((X) => {
      return X.model(modelName)
    })
  }

  static on(...args) {
    this.model.then((model) => {
      model.on.apply(model, args)
    })
  }

}

['list', 'get', 'distinct', 'create', 'remove', 'update'].forEach((name) => {
  Model[name] = function (...args) {
    return this.model.then((model) => {
      return new Promise((resolve, reject) => {
        args.push((err, result) => {
          err ?
            reject(err) :
            resolve(result)
        })

        model[name].apply(model, args)
      })
    })
  }
})
