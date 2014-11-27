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
            var range = util.getWeekRange(week);
            return {
                id: week,
                year: util.formatDate('${y}', range.begin),
                range: $.map(range, util.formatDate.bind(null, '${m}.${d}'))
            };
        })
    });
};

// fetch list and render
var refreshList = function(){
    Task.distinct('week', function(err, weeks){
        if(err){
            util.handleError(err);
        }else{
            renderHistoryList(weeks);
            main.show();
        }
    });
};

// update list if changes happen
Task.on('change', refreshList);

// initialize
refreshList();

})();