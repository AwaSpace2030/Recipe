import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import "./recipe.css";

function Recipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    db.collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
        } else {
          setError("Recipe not found");
        }
        setIsPending(false);
      })
      .catch(() => {
        setError("Failed to load recipe");
        setIsPending(false);
      });
  }, [id]);

  return (
    <div className="content-area">
      <div className="recipe-details">
        {isPending && (
          <div className="loading">
            <img src="/loading.gif" alt="loading" />
          </div>
        )}

        {error && <p>{error}</p>}

        {recipe && (
          <>
            <h2 className="recipe-title">{recipe.title}</h2>

            <div className="recipe-info">
              <h4>Ingredients</h4>
              <ul className="list-ing">
                {Array.isArray(recipe.ingredient) &&
                recipe.ingredient.length > 0 ? (
                  recipe.ingredient.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )}
              </ul>
              <br />
              <h4>Method</h4>
              <p className="method">{recipe.method}</p>
              <br />
              <h4>Cooking Time:</h4>
              {recipe.cookingTime} minutes
              <br />
              <br />
              <br />
              <Link to="/" className="btn-full-line">
                Explore Other Recipes →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recipe;
