function compareAndWriteUniqueStrings() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Clear previous content in Columns F, P, Q, R, and S
  var lastRow = sheet.getMaxRows(); // Get the maximum number of rows in the sheet
  sheet.getRange(1, 6, lastRow, 1).clearContent(); // Clearing Column F
  sheet.getRange(1, 16, lastRow, 4).clearContent(); // Clearing columns P, Q, R, and S

  // Fetch data elements from DHIS2 and write them to Column F
  var dataElements = fetchDataElements();
  writeToColumnF(dataElements, sheet);

  // Fetching data from Column A
  var columnAData = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();

  // Processing Column F data to create a map of processed and original strings
  var processedFDataMap = dataElements.map(function(element) {
    return {
      original: element.displayName,
      processed: removePrefix(element.displayName)
    };
  });

  // Iterating through each row in Column A
  for (var i = 0; i < columnAData.length; i++) {
    var currentAValue = columnAData[i][0];
    if (!currentAValue) break; // Stop the loop if the current row in Column A is empty
    var searchKeywords = extractKeywords(currentAValue);
    var found = false;
    var matchedOriginalString = "";
    var matchType = "";

    // Searching in processed Column F data
    for (var j = 0; j < processedFDataMap.length; j++) {
      var processedValue = processedFDataMap[j].processed;
      if (processedValue === currentAValue) { // Check for exact match first
        matchedOriginalString = processedFDataMap[j].original;
        found = true;
        matchType = "Exact Match";
        break;
      } else if (isMatch(searchKeywords, processedValue)) { // Then check for similar match
        matchedOriginalString = processedFDataMap[j].original;
        found = true;
        matchType = "Similar";
        break;
      }
    }

    // Writing the results to Columns P, Q, R, and S
    sheet.getRange(i + 1, 16).setValue(currentAValue); // Value from Column A in Column P
    sheet.getRange(i + 1, 17).setValue(found ? matchedOriginalString : "Not Found"); // Original value from Column F in Column Q
    sheet.getRange(i + 1, 18).setValue(found ? matchType : ""); // "Exact Match" or "Similar" in Column R
    sheet.getRange(i + 1, 19).setValue(searchKeywords.join(', ')); // Keywords used in search in Column S
  }
}

function fetchDataElements() {
  var url = 'https://DHIS2_URL/production/api/dataElements?filter=dataSetElements.dataSet.id:eq:yA9raHXXk1w&fields=id,displayName&paging=false';
  var username = 'DHIS2_USERNAME'; // Replace with your DHIS2 username
  var password = 'DHIS2_PASSWORD'; // Replace with your DHIS2 password
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
  return json.dataElements;
}

function writeToColumnF(dataElements, sheet) {
  for (var i = 0; i < dataElements.length; i++) {
    sheet.getRange(i + 1, 6).setValue(dataElements[i].displayName);
  }
}

function removePrefix(str) {
  var underscoreIndex = str.indexOf('_');
  return underscoreIndex !== -1 ? str.substring(underscoreIndex + 1) : str;
}

function extractKeywords(str) {
  // Split the string into words and return the array
  return str.split(' ');
}

function isMatch(keywords, targetString) {
  for (var i = 0; i < keywords.length; i++) {
    if (targetString.indexOf(keywords[i]) === -1) {
      return false;
    }
  }
  return true;
}
