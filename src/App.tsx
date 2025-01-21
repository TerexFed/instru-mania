import "./global.css";

import Search from "./components/search";
import Header from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import AiHelper from "./components/ai-helper";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace={true} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ai-helper" element={<AiHelper />} />
      </Routes>
    </>
  );
}

export default App;
