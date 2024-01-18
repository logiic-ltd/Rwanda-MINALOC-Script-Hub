function fetchDataElements() {
  var url = 'https://DHIS2_URL/production/api/dataElements?filter=dataSetElements.dataSet.id:eq:yA9raHXXk1w&paging=false';
  var username = 'DHIS2_USERNAME';
  var password = 'DHIS2_PASSWORD';
  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(username + ':' + password),
    "Content-Type": "application/json"
  };

  var options = {
    "method" : "get",
    "headers": headers,
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  var dataElements = json.dataElements;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange('A1:D1').setValues([['Data Elements', '', '', 'Comments']]); // Headers

  for (var i = 0; i < dataElements.length; i++) {
    var elementName = dataElements[i].displayName;
    sheet.getRange(i + 2, 1).setValue(elementName);

    // Check for two or more consecutive spaces
    if (elementName.includes("  ")) {
      sheet.getRange(i + 2, 4).setValue("Contains two or more consecutive spaces");
    }

    // Check for space(s) at the end
    if (/\s+$/.test(elementName)) {
      var comment = sheet.getRange(i + 2, 4).getValue();
      comment += (comment ? "; " : "") + "Has space(s) at the end";
      sheet.getRange(i + 2, 4).setValue(comment);
    }
  }
}


