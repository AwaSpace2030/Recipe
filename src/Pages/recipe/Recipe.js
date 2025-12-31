import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";
import "./recipe.css";

function Recipe() {
  const { id } = useParams();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(`https://6953ce22a319a928023cb79d.mockapi.io/api/recipes/${id}`);

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
                {Array.isArray(recipe.ingredients) &&
                recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No ingredients available</li>
                )}
              </ul>

              <br></br>
              <h4>Method</h4>
              <p className="method">{recipe.method}</p>
              <br></br>
              <h4>Cooking Time:</h4>
              {recipe.cookingTime}
              <br></br>
              <br></br>
              <br></br>
              <Link to="/" className="btn-full-line">
                Explore Ohter Reicpes →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recipe;
