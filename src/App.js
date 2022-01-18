import { Routes, Route } from "react-router";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from './colorHelpers'

function App() {
  return (
    <Routes>
      <Route path="/" element={<p>Hello</p>} />
      <Route path="/palette/:id" element={<h1>Individual Page</h1>} />
    </Routes>
    // <div className="App">
    // <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
