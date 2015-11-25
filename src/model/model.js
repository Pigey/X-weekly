/*
 * @file class Model
 * @author nighca <nighca@live.cn>
 */

import X from './x'
import { EventEmitter } from 'events'

const LISTENING = Symbol('listening')
const EMITTERS = {}

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

  static on(event, handler) {
    let listening = this[LISTENING] = this[LISTENING] || Object.create(null)
    let emitter = EMITTERS[this.modelName] = EMITTERS[this.modelName] || new EventEmitter()

    this.model.then((model) => {
      if (!listening[event]) {
        listening[event] = true
        model.on(event, function (...args) {
          emitter.emit(event, ...args)
        })
      }

      emitter.on(event, handler)
    })
  }

  static off(event, handler) {
    let emitter = EMITTERS[this.modelName]
    if (emitter) {
      emitter.removeListener(event, handler)
    }
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
      Model.on('change', function () {
        console.log('clean', Model.modelName)
        Model.cache = {}
      })
    }

    // wait for cache-clean
    return Promise.resolve().then(function () {
      const cache = Model.cache[name] = Model.cache[name] || {}
      const key = JSON.stringify(args.map(arg => (arg === undefined ? null : arg)))

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