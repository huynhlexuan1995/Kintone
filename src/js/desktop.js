(function () {
    "use strict";
    
    kintone.events.on(['app.record.index.show','app.record.index.edit.submit'], function (event) {
        console.log(event.records);
        return event;
    });
})();