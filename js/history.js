(function(){

// set header-side link
util.setSideLink('返回', './list.html');

// model Task
var Task = util.Task;

// doms
var main = $('#main'),
    historyList = $('#history-list');

// render list method
var renderHistoryList = function(weeks){
    historyList.innerHTML = template('template-history-list', {
        weeks: weeks.sort(function(a, b){
            return a < b;
        }).map(function(week){
            return {
                id: week,
                range: $.map(util.getWeekRange(week), util.formatDate.bind(null, '${y}.${m}.${d}'))
            };
        })
    });
};

// get list and render
Task.distinct('week', function(err, weeks){
    if(err){
        util.handleError(err);
    }else{
        renderHistoryList(weeks);
        main.show();
    }
});

})();