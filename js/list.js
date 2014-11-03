(function(){

// set header-side link
util.setSideLink('返回', './index.html');

// model Task
var Task = util.Task;

// doms
var main = $('#main'),
    personList = $('#person-list'),
    list = $('#list'),
    mailLink = $('#mail-link'),
    downLink = $('#down-link');

// render list method
var renderList = function(tasks){
    // do transform (task list -> data including projects)
    var data = util.transform(tasks);

    // person list
    var exists = {},
        persons = tasks.map(function(task){
        return task.person;
    }).filter(function(person){
        return exists[person] ? false : (exists[person] = true);
    });
    personList.innerHTML = '已提交：' + (persons.join('，') || '无');

    // list
    list.innerHTML = template('template-list', data);

    // get plain content
    var plainContent = data.projects.map(function(project){
        return $.format('${project}：\r\n\r\n\t${tasks}', {
            project: project.name,
            tasks: project.tasks.map(function(task, i){
                task.seq = i + 1;
                return $.format('${seq}. ${cnt} （${status}） 【${person}】', task);
            }).join('\r\n\t')
        });
    }).join('\r\n\r\n');

    // mail link
    mailLink.href = $.format('mailto:${mailto}?cc=${cc}&subject=${subject}&body=${body}', $.map({
        mailto: 'zuming@baidu.com',
        cc: 'csfe@baidu.com',
        subject: $.format('游戏特卖周报${date}', { date: util.formatDate('${y}-${m}-${d}', new Date()) }),
        //body: plainContent
    }, encodeURIComponent));

    // dowload link
    downLink.download = $.format('周报${begin}-${end}.txt', $.map(util.weekRange, util.formatDate.bind(null, '${y}.${m}.${d}')));
    downLink.href = URL.createObjectURL(new Blob([plainContent]));
};

// get list and render
Task.list({
    week: util.week
}, function(err, list){
    if(err){
        util.handleError(err);
    }else{
        renderList(list);
        main.show();
    }
});

})();