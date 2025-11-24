import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || data);
        } else if (res.status === 404) {
          throw new Error('Projects API not found (404)');
        } else {
          throw new Error(`Status ${res.status}`);
        }
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Projects</h1>
      <p className="text-center">A selection of hands-on projects highlighting problem solving and practical skills.</p>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-danger">Error loading projects: {error}</p>}

      <section aria-label="Project examples" className="row g-4 mt-3">
        {projects.map((p) => (
          <div key={p.name || p.title} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <header>
                  <h5 className="card-title fw-bold">{p.name || p.title}</h5>
                  <p className="card-text text-muted">{p.description || p.summary}</p>
                </header>

                <div className="mt-2 mb-3">
                  <h6 className="mb-1">Author</h6>
                  <p className="small mb-2">{p.author || 'Unknown'}</p>

                  <h6 className="mb-1">Languages</h6>
                  <div className="mb-2">
                    {(p.languages || p.technologies || []).map((t) => (
                      <span key={t} className="badge bg-secondary me-1 mb-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
