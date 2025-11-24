import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <h1>404 — Page Not Found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <Link className="btn btn-primary mt-3" to="/">Back to Home</Link>
    </div>
  );
}
