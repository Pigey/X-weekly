(function(){

util.setSideLink('查看本周', './list.html');

var inputs = {
    person: $('#person-in'),
    project: $('#project-in'),
    task: $('#task-in'),
    status: $('#status-in')
};

// restore username
localStorage.username && (inputs.person.value = localStorage.username);

X.ready(function(){
    var Task = X.model('Task', util.struct);

    var list = $('#list');
    var renderList = function(tasks){
        var data = util.transform(tasks);
        data.removeable = true;
        list.innerHTML = template('template-list', data);

        list.findAll('.j-remove').forEach(function(remove){
            var taskId = remove.getAttribute('data-task-id');
            remove.on('click', function(e){
                Task.remove({
                    _id: taskId
                }, function(err, result){
                    if(err){
                        alert(err);
                    }else{
                        refreshList();
                    }
                });
            });
        });
    };

    var refreshList = function(){
        Task.list({
            week: util.currWeek,
            person: inputs.person.value
        }, function(err, tasks){
            if(err){
                alert(err);
            }else{
                renderList(tasks);
            }
        });
    };

    var validate = function(){
        var legal = true;
        $.forEach(inputs, function(input, name){
            if(name !== 'status' && !input.value){
                input.addClass('invalid');
                legal = false;
                return false;
            }
        });
        return legal;
    };

    inputs.person.on('blur', function(e){
        // save to local
        localStorage.username = inputs.person.value;

        refreshList();
    });

    $('#submit').on('click', function(e){
        if(!validate()){
            return;
        }

        var task = {
            person: inputs.person.value,
            project: inputs.project.value,
            cnt: inputs.task.value,
            status: inputs.status.value,
            week: util.currWeek
        };

        Task.create(task, function(err, task){
            if(err){
                alert(err);
            }else{
                refreshList();
            }
        });
    });

    refreshList();
});

})();