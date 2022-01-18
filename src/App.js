import { Routes, Route } from "react-router";
import Palette from "./Palette";

function App() {
  return (
    <Routes>
      <Route path="/" element={<p>Hello</p>} />
      <Route path="/palette/:id" element={<Palette />} />
    </Routes>
  );
}

export default App;
