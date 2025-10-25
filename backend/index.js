import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 4000;
const DATA_FILE = './links.json';

app.use(cors());
app.use(express.json());

// Read all links
app.get('/api/links', (req, res) => {
  const links = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  res.json(links);
});

// Add a new link
app.post('/api/links', (req, res) => {
  const { url, title } = req.body;
  if (!url || !title) return res.status(400).json({ error: 'Missing url or title' });
  const links = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const newLink = { url, title, id: Date.now() };
  links.push(newLink);
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
  res.status(201).json(newLink);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});