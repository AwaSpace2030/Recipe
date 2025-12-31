import { useState } from "react";
import useFetch from "../../Hooks/UseFetch";
import "./create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState(""); // comma separated string
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      method,
      cookingTime: cookingTime + " minutes",
      ingredients: ingredients.split(",").map((item) => item.trim()), // convert string to array
    };

    console.log(newRecipe);

    try {
      const response = await fetch(
        "https://6953ce22a319a928023cb79d.mockapi.io/api/recipes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecipe),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      const data = await response.json();
      console.log("Recipe created:", data);

      // reset form fields
      setTitle("");
      setMethod("");
      setCookingTime("");
      setIngredients("");
      setSuccessMessage(true);
      // Hide message after 2 seconds
      setTimeout(() => setSuccessMessage(false), 1500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // using useFetch to fetch existing recipes
  const { data, isPending, error } = useFetch(
    "https://6953ce22a319a928023cb79d.mockapi.io/api/recipes"
  );

  return (
    <div className="create">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            placeholder="Enter Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Ingredients (comma separated):</span>
          <input
            type="text"
            placeholder="e.g. pasta, tomato, cheese"
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
          Submit
        </button>
      </form>

      {error && <p>{error}</p>}
      <div className={`success-message ${successMessage ? "show" : ""}`}>
        Recipe submitted successfully!
      </div>
    </div>
  );
}

export default Create;
