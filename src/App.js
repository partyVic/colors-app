import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
  const [palettes, setPalettes] = useState(savedPalettes || seedColors)

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette])
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id))
  }

  const syncLocalStorage = () => {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(palettes)
    )
  }

  useEffect(syncLocalStorage, [palettes])

  return (
    <Routes>
      <Route path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
      <Route path="/palette/:paletteId/:colorId" element={<SingleColorPalette palettes={palettes} />} />
      <Route path="/" element={<PaletteList palettes={palettes} deletePalette={deletePalette}/>} />
      <Route path="/palette/:id" element={<Palette palettes={palettes} />} />
      <Route path="*" element={<PaletteList palettes={palettes} deletePalette={deletePalette}/>} />
    </Routes>
  );
}

export default App;
