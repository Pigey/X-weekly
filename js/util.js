X.connect('http://cq01-rdqa-dev056.cq01.baidu.com:8083').config({token:'84054ce010d1ab12ad08dbf0a29e495b'});

var util = {
    currWeek: Math.ceil(Date.now() / (1000 * 60 * 60 * 24 * 7)),

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

    struct: {
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