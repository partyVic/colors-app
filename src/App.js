import { Routes, Route } from "react-router";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";

function App() {
  return (
    <Routes>
      <Route path="/palette/new" element={<NewPaletteForm />} />
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette />} />
      <Route path="/" element={<PaletteList palettes={seedColors} />} />
      <Route path="/palette/:id" element={<Palette />} />
    </Routes>
  );
}

export default App;
