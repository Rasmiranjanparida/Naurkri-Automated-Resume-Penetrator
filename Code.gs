function sendEmailWithLabel() {
  var recipient = "uploadresume@cv.naukri.com"; 
  var subject = "Daily Report with Resume";
  var body = "Please find my resume attached.";
  var fileId = "1-27_srkYKsL1dZ-lMXMy-bqEFo3i7hGa"; // Replace with your file ID
  var file = DriveApp.getFileById(fileId);
  
 
  GmailApp.sendEmail(recipient, subject, body, {
    attachments: [file.getAs(MimeType.PDF)],
  });
  
  
  var threads = GmailApp.search('to:' + recipient + ' subject:"' + subject + '"', 0, 1);
  if (threads.length > 0) {
    var thread = threads[0];
    var label = GmailApp.getUserLabelByName('UPLOAD_RESUME');
    
    
    if (!label) {
      label = GmailApp.createLabel('UPLOAD_RESUME');
    }
    
   
    thread.addLabel(label);
  }
  
 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getLastRow() + 1;
  var now = new Date();
  var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var formattedTime = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');   
  
  sheet.getRange(row, 1).setValue(formattedDate); // Log only the date
  sheet.getRange(row, 2).setValue(recipient);  // Log the recipient
  sheet.getRange(row, 3).setValue(formattedTime); // Log only the time
  sheet.getRange(row, 4).setValue("Sent");     // Log the status
}
