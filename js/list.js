util.setSideLink('返回', './index.html');

X.ready(function(){
    var Task = X.model('Task', util.struct);

    var list = $('#list'),
        downLink = $('#down-link');

    var renderList = function(taskList){
        var data = util.transform(taskList);
        
        list.innerHTML = template('template-list', data);

        var plain = data.projects.map(function(project){
            return [
                project.name,
                project.tasks.map(function(task, i){
                    return [
                        i + 1 + '.',
                        task.cnt,
                        '（' + task.status + '）',
                        '【' + task.person + '】'
                    ].join(' ');
                }).join('\r\n\t')
            ].join('\r\n\r\n\t')
        }).join('\r\n\r\n');

        var blob = new Blob([plain]);

        downLink.download = 'weekly-' + util.currWeek + '.txt';
        downLink.href = URL.createObjectURL(blob);
    };

    Task.list({
        week: util.currWeek
    }, function(err, list){
        if(err){
            alert(err);
        }else{
            renderList(list);
        }
    });
});