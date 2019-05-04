jQuery.noConflict();
( function (PLUGIN_ID) {
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
                window.location = window.location;
              }
            });
          }
      })
  });

  var userValue = ["All"];

  kintone.api(kintone.api.url("/k/v1/records", true), "GET", {app: appId}, function(response) {
      response.records.forEach(function(record) {
        userValue.indexOf(record['name'].value) === -1 ?
          userValue.push(record['name'].value) :
          null;
      });
  });

  var showed = false;

  kintone.events.on("app.record.index.show", function(event) {
    var selectUser = $("<select></select>").addClass("kintoneplugin-select");
    var inputDatePicker = $("<input></input>").addClass('kintoneplugin-button-normal datepicker');
    var confirmButton = $("<button>Search</button>").addClass('kintoneplugin-button-dialog-ok');

    userValue.forEach(function(name) {
      selectUser.append($("<option></option>").attr("value", name).text(name));
    });

    if (showed === false) {
      $(kintone.app.getHeaderMenuSpaceElement()).append([selectUser, inputDatePicker, confirmButton]);
      showed = true;
    }
    $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();

    confirmButton.click(function() {
      const selectedUser = selectUser[0].value;
      const selectedMonth = inputDatePicker[0].value;
      if (selectedUser !== "All" && selectedMonth !== '') {
        const encodedQuery = encodeURI(`name = "${selectedUser}" and date = "${selectedMonth}"`);
        window.location.href = `https://fabbier.kintone.com/k/${appId}/?query=${encodedQuery}`;
      } else if (selectedUser === "All" && selectedMonth === '') {
        window.location.href = `https://fabbier.kintone.com/k/${appId}`;
      } else {
        const encodedQuery = selectedMonth === '' ? encodeURI(`name = "${selectedUser}"`) : encodeURI(`date = "${selectedMonth}"`);
        window.location.href = `https://fabbier.kintone.com/k/${appId}/?query=${encodedQuery}`;
      }
    });
  });

})(jQuery, kintone.$PLUGIN_ID);