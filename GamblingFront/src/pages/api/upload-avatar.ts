// pages/api/upload-avatar.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = formidable({
      multiples: false, // Handle a single file (avatar)
      uploadDir,        // Set the directory where the files should be uploaded
      keepExtensions: true, // Keep the file extension (like .png, .jpg)
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'File upload error' });
        return;
      }

      const file = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;

      if (!file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      const oldPath = (file as File).filepath; // Make sure it's a single File object
      const newPath = path.join(uploadDir, file.originalFilename || file.newFilename);

      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          res.status(500).json({ message: 'Error saving the file' });
        } else {
          res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.newFilename}` });
        }
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
