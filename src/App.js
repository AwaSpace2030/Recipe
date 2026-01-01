import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Pages/home/Home";
import Search from "./Pages/search/Search";
import Create from "./Pages/create/Create";
import Recipe from "./Pages/recipe/Recipe";
import NavBar from "./component/Nav-Bar";
import Results from "./Pages/Search-Result/Result";
import { ThemeContext } from "./Context/contextTheme";
import { useState } from "react";
import "./App.css";
import "./darkMode.css";
import "./responsive.css";
import { ThemeButtons } from "./component/ThemeButtons";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        <Router>
          <NavBar />
          <ThemeButtons />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
