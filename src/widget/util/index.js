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
export let getWeek = function (d) {
    let day = (new Date(d = (d || Date.now()))).getDay()
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
export let formatDate = function (tpl, d) {
    return $.format(tpl || '${y}.${m}.${d}', {
        y: toLen(d.getFullYear(), 4),
        m: toLen(d.getMonth() + 1, 2),
        d: toLen(d.getDate(), 2)
    })
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
