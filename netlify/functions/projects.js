import fs from 'fs/promises';
import path from 'path';

export async function handler() {
  try {
    const file = path.join(process.cwd(), 'public', 'api', 'projects.json');
    const content = await fs.readFile(file, 'utf8');
    const json = JSON.parse(content);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json),
    };
  } catch (err) {
    console.error('Netlify function failed to read projects.json', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load projects' }),
    };
  }
}
