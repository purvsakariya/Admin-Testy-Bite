import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="errorPage">
      <h2>404: NOT_FOUND</h2>
      <p>Please First Sign in OR Log in</p>
        <div id="confirmation-actions">
          <button onClick={() => navigate("/signin")} className="button">
            Sign in
          </button>
          <button onClick={() => navigate("/login")} className="button">
            Log in
          </button>
        </div>
    </div>
  );
}