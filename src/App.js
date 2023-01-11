import React, { useState } from "react";
import Modal from "./components/Modal";
import RecipeSearch from "./components/RecipeSearch";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setOpen(true)}>add new recipe</button>
      <Modal open={open} onClose={() => setOpen(false)} />
      <RecipeSearch />
    </React.Fragment>
  );
}
