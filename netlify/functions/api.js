import fs from 'fs/promises';
import path from 'path';

export async function handler(event) {
  const q = event.queryStringParameters || {};
  const route = q.route || q.r || '';

  if (route === 'projects') {
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
      console.error('Failed to read projects.json', err);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to load projects' }),
      };
    }
  }

  if (route === 'weather') {
    // Read API key from environment
    // const key = process.env.OPENWEATHER_API_KEY;
    const key = 'ed15a02192e4b608ce233d5b8f3d31ed';
    const lat = q.lat || q.latitude || ''; 
    const lon = q.lon || q.longitude || '';

    if (!key) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'OpenWeather API key not configured (OPENWEATHER_API_KEY)' }),
      };
    }

    // Default to Halifax if coords missing
    const DEFAULT_LAT = 44.6488;
    const DEFAULT_LON = -63.5752;
    const useLat = lat !== '' ? lat : DEFAULT_LAT;
    const useLon = lon !== '' ? lon : DEFAULT_LON;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
        useLat
      )}&lon=${encodeURIComponent(useLon)}&units=metric&appid=${encodeURIComponent(key)}`;
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        console.error('OpenWeather API error', res.status, text);
        return {
          statusCode: 502,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: `OpenWeather API error: ${res.status}` }),
        };
      }

      const data = await res.json();
      const city = data.name || '';
      const temperature = data.main.temp;
      const humidity = data.main.humidity;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, temperature, humidity }),
      };
    } catch (err) {
      console.error('Error fetching OpenWeather', err);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to fetch weather' }),
      };
    }
  }

  return {
    statusCode: 400,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Missing or unknown route parameter' }),
  };
}
