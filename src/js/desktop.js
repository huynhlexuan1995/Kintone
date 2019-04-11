(function () {
    "use strict";

    var arr = [];

    function persionLate (arr) {
        var arr = [{a:'xxx',b:'yyy'}];
        arr.forEach( function(key, value) {
            console.log(key + ": " + value);
        });
    }

    kintone.events.on(['app.record.index.show','app.record.index.edit.submit'], function (event) {
        console.log(event.records);
        return event;
    });
})();