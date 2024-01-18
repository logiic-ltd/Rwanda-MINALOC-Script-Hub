function updateDataElements() {
  var url = 'https://DHIS2_URL/production/api/dataElements?filter=dataSetElements.dataSet.id:eq:yA9raHXXk1w&fields=id,displayName,aggregationType,domainType,valueType,shortName&paging=false';
  var username = 'DHIS2_USERNAME'; // Your username
  var password = 'DHIS2_PASSWORD'; // Your password
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

  Logger.log('Number of data elements retrieved: ' + dataElements.length);

  var updatedElements = [];
  var updateCount = 0;

  for (var i = 0; i < dataElements.length && updateCount < 500; i++) {
    var element = dataElements[i];
    var originalName = element.displayName;
    var needsUpdate = originalName.includes("  ") || /\s+$/.test(originalName);
    var correctedName = originalName.replace(/\s+/g, ' ').trim();

    if (needsUpdate && originalName !== correctedName) {
      Logger.log('Element needing update found: ' + originalName);

      var updateUrl = 'https://DHIS2_URL/production/api/dataElements/' + element.id;
      var updateBody = {
        "name": correctedName, // Might need to be updated as well
        "displayName": correctedName,
        "aggregationType": element.aggregationType,
        "domainType": element.domainType,
        "valueType": element.valueType,
        "shortName": element.shortName // Retaining the original shortName
      };

      var updateOptions = {
        "method": "put",
        "headers": headers,
        "contentType": "application/json",
        "payload": JSON.stringify(updateBody),
        "muteHttpExceptions": true
      };

      var updateResponse = UrlFetchApp.fetch(updateUrl, updateOptions);
      var responseCode = updateResponse.getResponseCode();
      var responseBody = updateResponse.getContentText();

      Logger.log('Updating element: ' + originalName + ' to ' + correctedName);
      Logger.log('Update response code: ' + responseCode);
      Logger.log('Update response body: ' + responseBody);

      if (responseCode === 200) {
        updatedElements.push({
          "originalName": originalName,
          "correctedName": correctedName
        });
        updateCount++;
      }
    }
  }

  // Logging updated elements
  if (updatedElements.length > 0) {
    Logger.log('Updated Data Elements:');
    updatedElements.forEach(function(element) {
      Logger.log('Original: ' + element.originalName + ', Corrected: ' + element.correctedName);
    });
  } else {
    Logger.log('No data elements were updated.');
  }
}
