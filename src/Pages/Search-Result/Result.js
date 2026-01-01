import { Link, useLocation } from "react-router-dom";
import "./result.css";

function Results() {
  const location = useLocation();
  const { results, searchTerm } = location.state || {
    results: [],
    searchTerm: "",
  };

  return (
    <div>
      <div className="wrapper">
        <div className="result">
          <h2>Search Results for "{searchTerm}"</h2>

          {results.length === 0 ? (
            <p className="no-result">
              No recipes found, try another search 🍽️”.
            </p>
          ) : (
            <div className="cards-view result-cards">
              {results.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipe/${recipe.id}`}
                  className="recipe-card"
                >
                  <h3>{recipe.title}</h3>
                  <p>{recipe.ingredients?.join(", ") || "No ingredients"}</p>
                  <p>{recipe.method}</p>
                </Link>
              ))}
            </div>
          )}
          <Link to="/" className="btn-full-line">
            Back home →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
