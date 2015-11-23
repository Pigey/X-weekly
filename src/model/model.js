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

['list', 'get', 'distinct', 'create', 'remove', 'update'].forEach(name => {
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

let cachable = function (name, method) {
  return function (...args) {
    const Model = this

    if (!Model.cache) {
      Model.cache = {}
      Model.model.then((model) => {
        model.on('change', function () {
          console.log('clean', Model.modelName)
          Model.cache = {}
        })
      })
    }

    const cache = Model.cache[name] = Model.cache[name] || {}
    const key = JSON.stringify(args.map(arg => (arg === undefined ? null : arg)))

    // wait for cache-clean
    return Promise.resolve().then(function () {
      if (cache.hasOwnProperty(key)) {
        console.log('hit', Model.modelName, name, key)
        return cache[key]
      }

      console.log('mis', Model.modelName, name, key)
      return cache[key] = method.apply(Model, args)
    })
  }
}

;['list', 'get', 'distinct'].forEach(name => {
  Model[name] = cachable(name, Model[name])
})