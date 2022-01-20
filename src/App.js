import { Routes, Route } from "react-router";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" element={<Palette />} />
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette />} />
    </Routes>
  );
}

export default App;
