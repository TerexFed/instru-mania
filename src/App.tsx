import "./global.css";


import Header from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import AiHelper from "./pages/aiHelperPage";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace={true} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/ai-helper" element={<AiHelper />} />
      </Routes>
    </>
  );
}

export default App;
