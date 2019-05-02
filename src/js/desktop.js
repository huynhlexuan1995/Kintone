jQuery.noConflict();
( function ($, PLUGIN_ID) {
  "use strict" ;
  const appId = kintone.app.getId();
  kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {app:appId}, function(resp) {
      $.ajax({
          url: 'http://localhost:3000/',
          type:'get',
          crossDomain: true,
          success: function(res){
            res.forEach(function(el){
                var indexInKintone = resp.records.findIndex(data => data["id"]["value"] == el["id"]);
                if (indexInKintone == -1) {
                var body = {
                  app: appId,
                  record: {
                      date: { value: moment(el["date"]).format("YYYY-MM-DD") },
                      name: { value: el["name"] },
                      start_time: { value: el["start_time"] },
                      end_time: { value: el["end_time"] },
                      note:{value: el["note"]},
                      id: { value: el["id"] }
                  }
                };
                kintone.api(kintone.api.url("/k/v1/record", true), "POST", body);
              }
            });
          }
      })
  });

  var userValue = ["All"];
  var monthValue = ["All"];

  kintone.api(kintone.api.url("/k/v1/records", true), "GET", {app: appId}, function(response) {
      response.records.forEach(function(record) {
        userValue.indexOf(record['name'].value) === -1 ?
          userValue.push(record['name'].value) :
          null;
        monthValue.indexOf(record['date'].value) === -1 ?
          monthValue.push(record['date'].value) :
          null;
      });
  });

  var showed = false;

  kintone.events.on("app.record.index.show", function(event) {

    var $timekeeping = $('.timekeeping').append($('.contents-gaia app-index-contents-gaia'));
    $timekeeping.append('<table class="recordlist-gaia"><thead><th class ="recordlist-header-cell-gaia label-5520071 recordlist-header-sortable-gaia"><div class ="recordlist-header-cell-inner-gaia"><span class ="recordlist-header-label-gaia">Date</span></div></th></thead></table>');
    
    var selectUser = $("<select></select>").addClass("kintoneplugin-select");
    var selectMonth = $("<select></select>").addClass("kintoneplugin-select");
    var confirmButton = $("<button>Search</button>").addClass('kintoneplugin-button-dialog-ok');

    userValue.forEach(function(name) {
      selectUser.append($("<option></option>").attr("value", name).text(name));
    });
    monthValue.forEach(function(date) {
      selectMonth.append($("<option></option>").attr("value", date).text(date));
    });

    if (showed === false) {
      $(kintone.app.getHeaderMenuSpaceElement()).append([selectUser, selectMonth, confirmButton]);
      showed = true;
    }

    confirmButton.click(function() {
      const selectedUser = selectUser[0].value;
      const selectedMonth = selectMonth[0].value;
      if (selectedUser !== "All" && selectedMonth !== "All") {
        const encodedQuery = encodeURI(`name = "${selectedUser}" and date = "${selectedMonth}"`);
        window.location.href = `https://fabbier.kintone.com/k/${appId}/?query=${encodedQuery}`;
      } else if (selectedUser === "All" && selectedMonth === "All") {
        window.location.href = `https://fabbier.kintone.com/k/${appId}`;
      } else {
        const encodedQuery = selectedMonth === "All" ? encodeURI(`name = "${selectedUser}"`) : encodeURI(`date = "${selectedMonth}"`);
        window.location.href = `https://fabbier.kintone.com/k/${appId}/?query=${encodedQuery}`;
      }
    });
  });

})(jQuery, kintone.$PLUGIN_ID);