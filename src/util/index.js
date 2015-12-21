/*
 * @file util methods
 * @author nighca <nighca@live.cn>
 */

// length of one day
export const ONE_DAY = 24 * 60 * 60 * 1000

// pre-set sequence for project
export const PROJECT_SEQUENCE = [
  '糯米-PC端',
  '糯米-WAP端',
  '糯米-组件化',
  '组件化开发平台',
  'API开放(鸿鹄)平台',
  '小游戏',
  '其他'
]

export const OCCUPIED_LEVEL_LIST = [
  {
    value: '1',
    desc: '无所事事'
  },
  {
    value: '2',
    desc: '略清闲'
  },
  {
    value: '3',
    desc: '挺充实'
  },
  {
    value: '4',
    desc: '有点忙'
  },
  {
    value: '5',
    desc: '忙成狗了'
  },
]

// get param in location.search
export function getQuery (key, process) {
  if(!location.search) return null
  for(let search = location.search.slice(1).split('&'), l = search.length, i = 0, kv; i < l; i++)
    if((kv = search[i].split('='))[0] === key) return process ? process(kv[1]) : kv[1]
}

// to given length
export function toLen (source, len) {
  return (Array.prototype.join.call({length: len + 1}, '0') + source).slice(-len)
}

// get week
export function getWeek (d = Date.now()) {
  let day = (new Date(d)).getDay()
  d -= ((day === 0 ? 7 : day) - 1) * ONE_DAY
  return Math.ceil(d / (ONE_DAY * 7))
}

// get week begin & end
export function getWeekRange (week) {
  let d = new Date(week * 7 * ONE_DAY)
  return {
    begin: new Date(+d - (d.getDay() - 1) * ONE_DAY),
    end: new Date(+d + (7 - d.getDay()) * ONE_DAY)
  }
}

// format date
export function formatDate (date) {
  let y = toLen(date.getFullYear(), 4)
  let m = toLen(date.getMonth() + 1, 2)
  let d = toLen(date.getDate(), 2)
  return `${y}.${m}.${d}`
}

export function sortBy (list, sequence, field) {
  // compare method for sort by pre-set sequence
  let compare = function (a, b) {
    [a, b] = [a, b]
      .map(item => sequence.indexOf(field ? item[field] : item))
      .map(item => (item >= 0 ? item : 99999))
    return a - b
  }

  return list.sort(compare)
}

export function tasksToProjects (tasks) {
  let projectMap = tasks.reduce((projectMap, task) => {
    let name = task.project
    let project = projectMap[name] = projectMap[name] || {
      name,
      tasks: []
    }

    project.tasks.push(task)
    return projectMap
  }, {})

  return sortBy(
    Object.keys(projectMap).map(name => projectMap[name]),
    PROJECT_SEQUENCE,
    'name'
  )
}

export function makeMailLink ({ mailto, cc, subject, body }) {
  [mailto, cc, subject, body] = [mailto, cc, subject, body].map(encodeURIComponent)
  return `mailto:${mailto}?cc=${cc}&subject=${subject}&body=${body}`
}

export function throttle (method, delay = 100) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    let me = this
    timer = setTimeout(() => {
      method.apply(me, args)
    }, delay)
  }
}

export function getRangeWeek (year) {
  let d = new Date()
  d.setFullYear(parseInt(year, 10))

  d.setMonth(0)
  d.setDate(1)
  let begin = getWeek(d)

  d.setMonth(11)
  d.setDate(31)
  let end = getWeek(d)

  return { begin, end }
}

