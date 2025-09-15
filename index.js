const express = require('express');
const { drive } = require('./server/config/googleDrive');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileMetadata = { name: req.file.originalname };
    const media = {
      mimeType: req.file.mimetype,
      body: Buffer.from(req.file.buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, webViewLink',
    });

    res.json({
      fileId: response.data.id,
      fileLink: response.data.webViewLink,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
