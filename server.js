import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/projects', (req, res) => {
  const file = path.join(__dirname, 'public', 'api', 'projects.json');
  try {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    res.json(json);
  } catch (err) {
    console.error('Failed to read projects.json', err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
