(function(){

// do connect & config X
X.connect('http://cq01-rdqa-dev056.cq01.baidu.com:8083').config({ token:'84054ce010d1ab12ad08dbf0a29e495b' });

// length of one day
var oneDay = 24 * 60 * 60 * 1000;

// get param in location.search
var getQuery = function(key, process){
    if(!location.search) return null;
    for(var search = location.search.slice(1).split('&'), l = search.length, i = 0, kv; i < l; i++)
        if((kv = search[i].split('='))[0] === key) return process ? process(kv[1]) : kv[1];
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
        y: d.getFullYear(),
        m: d.getMonth() + 1,
        d: d.getDate()
    });
};

// week
var week = getQuery('week', parseInt) || getWeek();

// week range
var weekRange = getWeekRange(week);

// sequence of projects
var projectSequence = [
    '游戏中间页',
    '游戏PS',
    '游戏商业系统',
    '特卖知心',
    '爱玩小游戏',
    '其他'
];

// sequence of status
var statusSequence = [
    '开发中',
    '待测试',
    '测试中',
    '测试完',
    '已上线'
];

// export util
window.util = {
    week: week,

    weekRange: weekRange,

    formatDate: formatDate,

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