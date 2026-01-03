import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/config";
import { AiFillDelete } from "react-icons/ai";

export function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    db.collection("recipes")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(data.reverse());
        setIsPending(false);
      })
      .catch(() => {
        setError("Failed to load recipes");
        setIsPending(false);
      });
  };

  //  delete recipe
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await db.collection("recipes").doc(id).delete();
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      } catch (err) {
        console.error("Failed to delete recipe:", err);
      }
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

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
            <button
              className="btn-delete"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete <AiFillDelete />
            </button>

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

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
