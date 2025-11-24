import { useEffect, useState } from 'react';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locationLabel, setLocationLabel] = useState('');

  useEffect(() => {
    const DEFAULT = { lat: 44.6488, lon: -63.5752, label: 'Halifax, NS (default)' };
    let mounted = true;

    async function fetchWeather(lat, lon, label) {
      if (!mounted) return;
      setWeatherLoading(true);
      setWeatherError(null);
      setLocationLabel(label || '');
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setWeather(data.current_weather || null);
      } catch (err) {
        if (!mounted) return;
        setWeatherError(err.message || 'Failed to fetch weather');
        if (lat !== DEFAULT.lat || lon !== DEFAULT.lon) {
          try {
            const res2 = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT.lat}&longitude=${DEFAULT.lon}&current_weather=true&timezone=auto`
            );
            if (res2.ok) {
              const d2 = await res2.json();
              setWeather(d2.current_weather || null);
              setLocationLabel(DEFAULT.label);
            }
          } catch {
          }
        }
      } finally {
        if (mounted) setWeatherLoading(false);
      }
    }

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!mounted) return;
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude, 'Your location');
        },
        (err) => {
          fetchWeather(DEFAULT.lat, DEFAULT.lon, DEFAULT.label);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
      );
    } else {
      fetchWeather(DEFAULT.lat, DEFAULT.lon, DEFAULT.label);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center py-3">
        <h1>Welcome! I'm Samiah :)</h1>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <section className="p-3 rounded-3" style={{ background: 'var(--card-bg)', border: '1px solid rgba(126,203,255,0.12)' }}>
            <h4>Fun facts about me</h4>
            <ul>
              <li>My name is pronounced Sa-mee-ya.</li>
              <li>My current fixations are cozy spaces and fusion food.</li>
              <li>I eat eggs for breakfast every single day.</li>
            </ul>

            <div className="mt-3 d-flex gap-2">
              <a href="mailto:samiah@dal.ca" className="btn btn-primary">Email</a>
              <a href="https://www.linkedin.com/in/samiahh" className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-6">
          <section className="p-3 rounded-3" style={{ background: 'var(--card-bg)', border: '1px solid rgba(126,203,255,0.12)' }}>
            <h4>Current Weather</h4>
            {locationLabel && <div className="small text-muted mb-2">Location: {locationLabel}</div>}
            {weatherLoading && <p>Loading weather...</p>}
            {weatherError && <p className="text-danger">Error: {weatherError}</p>}
            {weather && (
              <div>
                <p className="mb-1">Temperature: <strong>{weather.temperature}°C</strong></p>
                <p className="mb-0">Wind Speed: {weather.windspeed} m/s</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
