import { Link } from "react-router-dom";
import "./nav-bar.css";
import Search from "../Pages/search/Search";

function NavBar() {
  return (
    <div>
      <div className="nav-bar">
        <nav>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="" />
            <h2 className="logo-text">Food Recipe</h2>
          </Link>
          <div className="right-nav">
            <Search />
            <Link to="/create" className="btn-out-line">
              Create New +
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
