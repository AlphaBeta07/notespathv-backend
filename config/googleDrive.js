// server/config/googleDrive.js
const { google } = require('googleapis');

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON environment variable');
}

// Parse JSON from environment variable
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// Get the Drive client
const drive = google.drive({ version: 'v3', auth });

module.exports = { drive };
