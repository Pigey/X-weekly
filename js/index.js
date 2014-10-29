util.setSideLink('查看本周', './list.html');

X.ready(function(){
    var Task = X.model('Task', util.struct);

    var taskList = [],
        list = $('#list');

    var renderList = function(){
        list.innerHTML = template('template-list', util.transform(taskList));
    };

    var inputs = {
        person: $('#person-in'),
        project: $('#project-in'),
        task: $('#task-in'),
        status: $('#status-in')
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
                taskList.push(task);
                renderList();
            }
        });
    });
});