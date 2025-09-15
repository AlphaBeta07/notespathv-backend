const { google } = require('googleapis');
const path = require('path');
const { Readable } = require('stream');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../path-to-your-google-drive-credentials.json'),
  scopes: SCOPES
});

const driveService = google.drive({ version: 'v3', auth });

async function uploadToDrive(file, metadata) {
  try {
    const fileMetadata = {
      name: metadata.title,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),  // ✅ Use stream from buffer
    };

    const response = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
}

module.exports = { uploadToDrive };
