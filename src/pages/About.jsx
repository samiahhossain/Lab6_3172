import { useMemo, useState } from 'react';

const SKILLS = [
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'React Native', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'C', category: 'Systems' },
  { name: 'C#', category: 'Systems' },
  { name: 'SQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Azure', category: 'DevOps' },
  { name: 'Git', category: 'Tooling' },
  { name: 'pandas', category: 'Data' },
  { name: 'NumPy', category: 'Data' },
  { name: 'Matplotlib', category: 'Data' },
  { name: 'Wireshark', category: 'Security' },
  { name: 'Metasploit', category: 'Security' },
];

export default function About() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(() => new Set());

  const categories = useMemo(() => Array.from(new Set(SKILLS.map((s) => s.category))), []);

  function toggleCategory(cat) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      const matchesQuery = q === '' || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(s.category);
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategories]);

  const experiences = [
    {
      company: 'CPP Investments',
      role: 'Software Engineer Intern',
      period: 'Jan 2026 - Apr 2026',
      location: 'Toronto, ON',
      description:
        'Worked on internal tooling and frontend features to improve crew scheduling UX. Collaborated with backend and QA to ship production fixes.',
      logo: '/src/assets/cppinvestmentsinvestissementsrpc_logo.jpg',
    },
    {
      company: 'Jazz Aviation',
      role: 'Full Stack Developer Intern',
      period: 'May 2025 - Aug 2025',
      location: 'Enfield, NS',
    },
    {
      company: 'SuperNOVA',
      role: 'Computer Science Instructor',
      period: 'May 2024 - Aug 2024',
      location: 'Halifax, NS',
    },
    {
      company: 'Brilliant Labs',
      role: 'STEAM Mentor Supervisor',
      period: 'Jun 2023 - Mar 2024',
      location: 'Halifax, NS',
    },
    {
      company: 'Marine Environmental Modeling Group',
      role: 'Web Developer Intern',
      period: 'Jul 2022 - Sep 2022',
      location: 'Halifax, NS',
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <main className="col-12">
          <div className="card mb-3 gradient-border">
            <div className="card-body">
              <h1 className="card-title">About</h1>

              <section className="mt-3">
                <h5>Backstory</h5>
                <p>
                  My curiosity in tech began in high school, when I taught myself basic
                  web development. I was drawn to the control, flexibility, and
                  customizability I had with the ability to code and use technical tools
                  effectively.
                </p>
              </section>

              <section className="mt-3">
                <h5>Education</h5>
                <p>
                  I am an undergraduate computer science student at Dalhousie University,
                  currently in my third year. I am additionally pursuing a Certificate in
                  Communication Technologies and Cyber Security and a Certificate in Web &
                  Mobile Development.
                </p>
              </section>

              <section className="mt-3">
                <h5>Experience</h5>
                <div className="mt-2">
                  <div className="row">
                    {experiences.map((e) => (
                      <div key={`${e.company}-${e.role}`} className="col-12 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="mb-1 text-start">{e.role}</h6>
                            <div className="mb-1 small">{e.company}</div>
                            <div className="small">{e.period} • {e.location}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-3">
                <h5>Goals</h5>
                <p>
                  I am most excited about full stack software development and cybersecurity, and I also possess skills and knowledge in cloud computing, artificial intelligence, data analytics, DevOps, and web design. I continually work to learn new skills and expand on existing ones. While I'm still exploring my specific area of interest, I would love to work in a role and organization where I am excited to contribute and grow.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <div className="card gradient-border">
            <div className="card-body">
              <h5 className="card-title">Technical Skills</h5>
              <p className="text-muted small">Tools, languages, frameworks and libraries I use:</p>

              <div className="mb-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search skills or categories (live)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search skills"
                />
              </div>

              <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`btn btn-sm ${selectedCategories.has(c) ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => toggleCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <p className="text-muted">No skills match your search.</p>
              ) : (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2">
                  {filtered.map((s) => (
                    <div key={s.name} className="col">
                      <div className="d-flex flex-column align-items-start gap-1 p-2 border rounded bg-white skill-border">
                        <div className="fw-semibold">{s.name}</div>
                        <div className="small text-muted">{s.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
