import { useState } from "react";
import { db, firebase } from "../../Firebase/config";
import "./create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newRecipe = {
        title,
        method,
        cookingTime: cookingTime + " minutes",
        ingredients: ingredients.split(",").map((i) => i.trim()),
        createdAt: firebase.firestore.Timestamp.now(),
      };

      await db.collection("recipes").add(newRecipe);

      setTitle("");
      setMethod("");
      setCookingTime("");
      setIngredients("");
      setSuccessMessage(true);

      setTimeout(() => setSuccessMessage(false), 1500);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="create">
      <h2>Create New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Ingredients (comma separated):</span>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Cooking Time in Min:</span>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Recipe Method:</span>
          <textarea
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </label>

        <button className="btn-full-line" type="submit">
          Add New Recipe
        </button>
      </form>

      <div className={`success-message ${successMessage ? "show" : ""}`}>
        Recipe submitted successfully!
      </div>
    </div>
  );
}

export default Create;
