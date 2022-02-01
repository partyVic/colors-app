import { useState } from "react";
import { Routes, Route } from "react-router";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";

function App() {
  const [palettes, setPalettes] = useState(seedColors)

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  }
 
  return (
    <Routes>
      <Route path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes}/>} />
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette palettes={palettes}/>} />
      <Route path="/" element={<PaletteList palettes={palettes} />} />
      <Route path="/palette/:id" element={<Palette palettes={palettes}/>} />
    </Routes>
  );
}

export default App;
