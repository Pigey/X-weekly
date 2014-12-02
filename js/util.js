(function(){

// do connect & config X
X.connect('104.236.176.244:8083').config({ token:'a1943f0a9991c7279b93ea8fa57d3cdf' });

// length of one day
var oneDay = 24 * 60 * 60 * 1000;

// get param in location.search
var getQuery = function(key, process){
    if(!location.search) return null;
    for(var search = location.search.slice(1).split('&'), l = search.length, i = 0, kv; i < l; i++)
        if((kv = search[i].split('='))[0] === key) return process ? process(kv[1]) : kv[1];
};

// to given length
var toLen = function(source, len){
    return (Array.prototype.join.call({length:len + 1}, '0') + source).slice(-len);
};

// get week
var getWeek = function(d){
    var day = (new Date(d = (d || Date.now()))).getDay();
    d -= ((day === 0 ? 7 : day) - 1) * oneDay;
    return Math.ceil(d / (oneDay * 7));
};

// get week begin & end
var getWeekRange = function(week){
    var d = new Date(week * 7 * oneDay);
    return {
        begin: new Date(+d - (d.getDay() - 1) * oneDay),
        end: new Date(+d + (7 - d.getDay()) * oneDay)
    }
};

// format date
var formatDate = function(tpl, d){
    return $.format(tpl || '${y}.${m}.${d}', {
        y: toLen(d.getFullYear(), 4),
        m: toLen(d.getMonth() + 1, 2),
        d: toLen(d.getDate(), 2)
    });
};

// week
var week = getQuery('week', parseInt) || getWeek();

// week range
var weekRange = getWeekRange(week);

// sequence of projects
var projectSequence = [
    '公司事务',
    '阅读',
    '写作',
    '外包',
    '个人项目',
    '其他'
];

// sequence of status
var statusSequence = [
    '计划中',
    '进行中',
    '已完成'
];

// export util
window.util = {
    week: week,

    toLen: toLen,

    weekRange: weekRange,

    formatDate: formatDate,

    getWeekRange: getWeekRange,

    projectSequence: projectSequence,

    statusSequence: statusSequence,

    // error handler
    handleError: function(error){
        console.error(error.message || error);
        alert('出错了，请到console中查看错误信息');
    },

    // tasks -> data with project list
    transform: function(taskList){
        var projectMap = {};

        taskList.forEach(function(task){
            var project = projectMap[task.project];
            if(!project){
                project = projectMap[task.project] = {
                    name: task.project,
                    tasks: []
                };
            }

            project.tasks.push(task);
        });

        var projects = Object.keys(projectMap).map(function(projectName){
            return projectMap[projectName];
        });
        projects.sort(function(a, b){
            return projectSequence.indexOf(a.name) > projectSequence.indexOf(b.name);
        });    

        return {
            projects: projects
        };
    },

    // get model
    Task: X.model('Task'),

    // set header-side link
    setSideLink: function(name, url){
    	var link = $('#side-link');
    	link.innerHTML = name;

        if(getQuery('week')) url += (url.indexOf('?') >= 0 ? '&' : '?') + 'week=' + week;
    	link.setAttribute('href', url);
    }
};

// set title
$(document).on('DOMContentLoaded', function(){
    var range = $.format('${begin}-${end}', $.map(weekRange, formatDate.bind(null, '${m}.${d}')));

    $('title').innerHTML = 'Weekly ' + range;
    $('#sub-title').innerHTML = range;
});

})();