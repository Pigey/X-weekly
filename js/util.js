X.connect('http://cq01-rdqa-dev056.cq01.baidu.com:8083').config({token:'84054ce010d1ab12ad08dbf0a29e495b'});

var util = {
    currWeek: (function(d){
        var day = d.getDay();
        d -= ((day === 0 ? 7 : day) - 1) * 24 * 60 * 60 * 1000;
        return Math.ceil(d / (1000 * 60 * 60 * 24 * 7));
    })(new Date()),

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

        return {
            projects: Object.keys(projectMap).map(function(projectName){
                return projectMap[projectName];
            })
        };
    },

    Task: {
        project: 'String',
        person: 'String',
        status: 'String',
        cnt: 'String',
        week: 'Number'
    },

    setSideLink: function(name, url){
    	var link = $('#side-link');
    	link.innerHTML = name;
    	link.setAttribute('href', url);
    }
};