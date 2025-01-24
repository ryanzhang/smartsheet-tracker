function updateSalesCloudLinkAndRemoveCommercial() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();  // Get the active sheet
    var dataRange = sheet.getDataRange();  // Get the range of data
    var values = dataRange.getValues();  // Get all values in the data range
    
    // Loop through the rows (skip the header row which is the first row, so i starts from 1)
    for (var i = 1; i < values.length; i++) {
      var accountSegment = values[i][3]; // Account Segment is in column D (index 3)
      var accountID = values[i][12];     // Account ID is in column L (index 11)
      
      // Log the account segment and account ID for debugging
      // Logger.log("Row " + (i + 1) + " - Account Segment: " + accountSegment + ", Account ID: " + accountID);
      
      // Check if the Account Segment is exactly 'Commercial'
      if (accountSegment.trim() === 'Commercial') {  // Using trim to remove any extra spaces
        // Logger.log("Deleting row " + (i + 1));  // Log which row is being deleted
        sheet.deleteRow(i + 1);  // Delete the row (adjust for 0-based index)
        
        // After deleting, reload the data to reflect the change (i.e., the row has shifted)
        values = sheet.getDataRange().getValues();  // Reload the values after row deletion
        
        // Decrease the index to ensure we process the next row (which has shifted into the current row's position)
        i--;  
        continue;  // Skip further processing for this row
      }
      
      // If Account ID exists, create the Sales Cloud Link
      if (accountID) {
        var salesCloudLink = 'https://redhatcrm.lightning.force.com/lightning/r/Account/' + accountID + '/view';
        sheet.getRange(i + 1, 9).setValue(salesCloudLink);  // Column 9 is "Sales Cloud Link"
      }
    }
    
    // Show logs after script execution
    // Logger.flush();
  }
  