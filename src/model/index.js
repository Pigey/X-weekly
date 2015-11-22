/*
 * @file X models
 * @author nighca <nighca@live.cn>
 */

import Model from './model'

export class Task extends Model {
  static get modelName() {
    return 'task'
  }
}

export class Project extends Model {
  static get modelName() {
    return 'project'
  }
}

export class Status extends Model {
  static get modelName() {
    return 'status'
  }
}