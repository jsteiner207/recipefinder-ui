import React, { useState } from "react";
import Modal from "./components/Modal";
import RecipeSearch from "./components/RecipeSearch";
import AuthForm from "./components/AuthForm";
import Homebar from "./components/Homebar";

export default function App() {
  const [open, setOpen] = useState(false);


  return (
    <React.Fragment>
      <Homebar />
      <AuthForm />
      <button onClick={() => setOpen(true)}>add new recipe</button>
      <Modal open={open} onClose={() => setOpen(false)} />
      <RecipeSearch />
    </React.Fragment>
  );
}
