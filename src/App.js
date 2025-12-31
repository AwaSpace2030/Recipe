import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Search from "./Pages/search/Search";
import Create from "./Pages/create/Create";
import Recipe from "./Pages/recipe/Recipe";
import NavBar from "./component/Nav-Bar";
import "./App.css";
import "./responsive.css";
import Results from "./Pages/Search-Result/Result";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
