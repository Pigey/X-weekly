X.connect('http://cq01-rdqa-dev056.cq01.baidu.com:8083').config({token:'84054ce010d1ab12ad08dbf0a29e495b'});

var util = {
    // current week
    currWeek: (function(d){
        var day = d.getDay();
        d -= ((day === 0 ? 7 : day) - 1) * 24 * 60 * 60 * 1000;
        return Math.ceil(d / (1000 * 60 * 60 * 24 * 7));
    })(new Date()),

    // sequence of projects
    projectSequence: [
        '游戏中间页',
        '游戏PS',
        '游戏商业系统',
        '特卖知心',
        '爱玩小游戏',
        '其他'
    ],

    // tasks -> data with project list
    transform: function(taskList){
        var projectSequence = this.projectSequence,
            projectMap = {};

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

    // task struct
    Task: {
        project: 'String',
        person: 'String',
        status: 'String',
        cnt: 'String',
        week: 'Number'
    },

    // set header-side link
    setSideLink: function(name, url){
    	var link = $('#side-link');
    	link.innerHTML = name;
    	link.setAttribute('href', url);
    }
};