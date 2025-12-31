import { useState, useEffect } from "react";
import "./search.css";
import { CiSearch } from "react-icons/ci";
import useFetch from "../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";

function Search() {
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading state
  const navigate = useNavigate();
  const { data } = useFetch(
    "https://6953ce22a319a928023cb79d.mockapi.io/api/recipes"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data) return;

    setIsLoading(true); // start loading

    const filtered = data.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase()) ||
        recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(term.toLowerCase())
        )
    );

    // small timeout to simulate loading
    setTimeout(() => {
      setIsLoading(false); // stop loading
      navigate("/results", { state: { results: filtered, searchTerm: term } });
    }, 500);
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
    </div>
  );
}

export default Search;
