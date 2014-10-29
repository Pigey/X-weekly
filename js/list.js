util.setSideLink('返回', './index.html');

X.ready(function(){
    var Task = X.model('Task', util.struct);

    var list = $('#list');

    var renderList = function(taskList){
        list.innerHTML = template('template-list', util.transform(taskList));
    };

    Task.list({}, function(err, list){
        if(err){
            alert(err);
        }else{
            renderList(list);
        }
    });
});