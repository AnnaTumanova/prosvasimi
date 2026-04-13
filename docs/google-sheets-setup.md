# Google Sheets Integration Setup

## Overview
This guide explains how to connect the workshop registration form to Google Sheets using Google Apps Script.

## Option 1: Use Existing Waitlist Script (Recommended)

If you already have a Google Apps Script for the waitlist, you can modify it to handle workshop registrations too. The API will use the same `WAITLIST_APPS_SCRIPT_URL` if `WORKSHOP_APPS_SCRIPT_URL` is not set.

### Update Your Existing Apps Script

Add this to your existing `doPost` function:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);
  
  // Check if this is a workshop registration
  if (data.type === 'workshop_registration') {
    // Get or create Workshop Registrations sheet
    let workshopSheet = sheet.getSheetByName('Workshop Registrations');
    if (!workshopSheet) {
      workshopSheet = sheet.insertSheet('Workshop Registrations');
      workshopSheet.appendRow(['Timestamp', 'Name', 'Email', 'Workshop ID', 'Workshop Title', 'Language', 'User Agent', 'IP']);
    }
    
    workshopSheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.name || '',
      data.email,
      data.workshopId,
      data.workshopTitle || '',
      data.lang || 'en',
      data.userAgent || '',
      data.ip || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, type: 'workshop' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Original waitlist logic
  let waitlistSheet = sheet.getSheetByName('Waitlist') || sheet.getActiveSheet();
  waitlistSheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.name || '',
    data.email,
    data.role || 'candidate',
    data.lang || 'en',
    data.userAgent || '',
    data.ip || ''
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, type: 'waitlist' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Option 2: Create a Separate Script

If you want a dedicated script for workshop registrations:

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Workshop Registrations"
3. Add headers in Row 1: `Timestamp | Name | Email | Workshop ID | Workshop Title | Language | User Agent | IP`

### Step 2: Create Apps Script
1. In your spreadsheet, go to **Extensions > Apps Script**
2. Replace the default code with:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.name || '',
    data.email,
    data.workshopId,
    data.workshopTitle || '',
    data.lang || 'en',
    data.userAgent || '',
    data.ip || ''
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3: Deploy as Web App
1. Click **Deploy > New deployment**
2. Select type: **Web app**
3. Set:
   - Description: "Workshop Registration Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the Web app URL

### Step 4: Add to Environment Variables

Add to your `.env.local`:

```
WORKSHOP_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Or if using the same script as waitlist, just ensure `WAITLIST_APPS_SCRIPT_URL` is set.

## Testing

1. Run the dev server: `npm run dev`
2. Go to http://localhost:3000/offer
3. Click "Register Interest" on any workshop
4. Fill in the form and submit
5. Check your Google Sheet for the new row

## Troubleshooting

- **CORS errors**: Make sure "Who has access" is set to "Anyone"
- **No data appearing**: Check the Apps Script execution logs (View > Executions)
- **500 errors**: Verify the environment variable is set correctly
