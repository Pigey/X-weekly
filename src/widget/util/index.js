/*
 * @file util methods
 * @author nighca <nighca@live.cn>
 */

// length of one day
export let oneDay = 24 * 60 * 60 * 1000

// get param in location.search
export let getQuery = function (key, process) {
    if(!location.search) return null
    for(let search = location.search.slice(1).split('&'), l = search.length, i = 0, kv; i < l; i++)
        if((kv = search[i].split('='))[0] === key) return process ? process(kv[1]) : kv[1]
}

// to given length
export let toLen = function (source, len) {
    return (Array.prototype.join.call({length: len + 1}, '0') + source).slice(-len)
}

// get week
export let getWeek = function (week) {
    if (!isNaN(week = parseInt(week, 10))) {
        return week
    }

    let d = Date.now()
    let day = (new Date(d)).getDay()
    d -= ((day === 0 ? 7 : day) - 1) * oneDay
    return Math.ceil(d / (oneDay * 7))
}

// get week begin & end
export let getWeekRange = function (week) {
    let d = new Date(week * 7 * oneDay)
    return {
        begin: new Date(+d - (d.getDay() - 1) * oneDay),
        end: new Date(+d + (7 - d.getDay()) * oneDay)
    }
}

// format date
export let formatDate = function (date) {
    let y = toLen(date.getFullYear(), 4)
    let m = toLen(date.getMonth() + 1, 2)
    let d = toLen(date.getDate(), 2)
    return `${y}.${m}.${d}`
}

export let tasksToProjects = function (tasks) {
    let projectMap = tasks.reduce((projectMap, task) => {
        let name = task.project
        let project = projectMap[name] = projectMap[name] || {
            name,
            tasks: []
        }

        project.tasks.push(task)
        return projectMap
    }, {})

    return Object.keys(projectMap)
        .map(name => projectMap[name])
        .sort((a, b) => (a.name > b.name ? 1 : -1))
}

export let makeMailLink = function ({ mailto, cc, subject, body }) {
    [mailto, cc, subject, body] = [mailto, cc, subject, body].map(encodeURIComponent)
    return `mailto:${mailto}?cc=${cc}&subject=${subject}&body=${body}`
}
