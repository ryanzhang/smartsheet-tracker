function updateARRColumn() {
  var sheetA = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("APAC_Account_ARR"); // Replace with your actual sheet name
  var sheetB = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("APAC Accounts - With Segment"); // Replace with your actual sheet name

  // Get data from both sheets
  var dataA = sheetA.getDataRange().getValues(); // Table A
  var dataB = sheetB.getDataRange().getValues(); // Table B

  // Find the column indices
  var accountNameIndexA = dataA[0].indexOf("Account Name"); // Replace "Account Name" with the exact header in Table A
  var yearWiseARRIndex = dataA[0].indexOf("Year_wise_ARR"); // Replace "Year_wise_ARR" with the exact header in Table A
  var accountNameIndexB = dataB[0].indexOf("Account Name"); // Replace "Account Name" with the exact header in Table B
  var arrIndexB = dataB[0].indexOf("ARR"); // Replace "ARR" with the exact header in Table B

  if (accountNameIndexA === -1 || yearWiseARRIndex === -1 || accountNameIndexB === -1 || arrIndexB === -1) {
    throw new Error("One or more required columns are missing. Check the column names in both sheets.");
  }

  // Create a mapping of Account Name to Year_wise_ARR from Table A
  var accountToARRMap = {};
  for (var i = 1; i < dataA.length; i++) {
    var accountNameA = dataA[i][accountNameIndexA];
    var yearWiseARR = dataA[i][yearWiseARRIndex];
    if (accountNameA) {
      accountToARRMap[accountNameA] = yearWiseARR;
    }
  }

  // Update the ARR column in Table B
  for (var j = 1; j < dataB.length; j++) {
    var accountNameB = dataB[j][accountNameIndexB];
    if (accountNameB && accountToARRMap[accountNameB] !== undefined) {
      sheetB.getRange(j + 1, arrIndexB + 1).setValue(accountToARRMap[accountNameB]); // Write ARR value to Table B
    }
  }
}
