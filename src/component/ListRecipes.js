import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";

export function ListRecipes() {
  const { data, isPending, error } = useFetch(
    "https://6953ce22a319a928023cb79d.mockapi.io/api/recipes"
  );

  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setRecipes(sorted);
    }
  }, [data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="wrapper">
      {isPending && (
        <div className="loading">
          <img src="./loading.gif" alt="loading" />
        </div>
      )}

      {error && <p>{error}</p>}

      <div className="cards-view">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title || "No title"}</h2>

            <p>
              <span className="sub-title">Ingredients:</span>
              <br />
              {recipe.ingredients?.join(", ") || "No ingredients"}
            </p>
            <br />

            <p>
              <span className="sub-title">Method:</span>
              <br />
              {recipe.method || "No method provided"}
            </p>

            <br />
            <p>
              <span className="sub-title">Cooking Time:</span>
              <br />
              {recipe.cookingTime || "No cooking time"}
            </p>
            <br />

            <Link to={`/recipe/${recipe.id}`} className="btn-full-line">
              View More
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
