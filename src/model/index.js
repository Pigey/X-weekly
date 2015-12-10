/*
 * @file X models
 * @author nighca <nighca@live.cn>
 */

import Model from './model'

// task
export class Task extends Model {
  static get modelName() {
    return 'task'
  }
}

// existed project
export class Project extends Model {
  static get modelName() {
    return 'project'
  }
}

// status for task
export class Status extends Model {
  static get modelName() {
    return 'status'
  }
}

// level of one's being occupied
export class Occupied extends Model {
  static get modelName() {
    return 'occupied'
  }
}
