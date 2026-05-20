import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="error-page-container">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist or requires authentication.</p>
        <div id="confirmation-actions">
          <button onClick={() => navigate("/")} className="button">
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}