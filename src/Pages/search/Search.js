import { useState } from "react";
import "./search.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config";

function Search() {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term) return;

    setIsLoading(true);
    setError(null);

    // جلب البيانات من Firebase
    db.collection("recipes")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // فلترة النتائج
        const filtered = data.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.ingredient?.some((ing) =>
              ing.toLowerCase().includes(term.toLowerCase())
            )
        );

        setIsLoading(false);
        navigate("/results", {
          state: { results: filtered, searchTerm: term },
        });
      })
      .catch((err) => {
        setError("Failed to fetch recipes");
        setIsLoading(false);
      });
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Find recipe..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <button className="btn-search">
          <CiSearch />
        </button>
      </form>

      {isLoading && (
        <div className="loading">
          <img src="./loading.gif" alt="loading" />
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Search;
