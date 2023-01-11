import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import IngredientListForm from "./IngredientListForm";

const AddRecipeForm = ({ onClose }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    directions: "",
  });

  const getIngredients = (newIngredients) => {
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setRecipe({
      name: "",
      ingredients: [],
      directions: "",
    });
    onClose();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicRecipe">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="scrambled Eggs"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
      </Form.Group>

      <IngredientListForm
        refreshIngredients={getIngredients}
        ingredients={recipe.ingredients}
      />

      <Form.Group className="mb-3" controlId="FormRecipeDirections">
        <Form.Label>Directions</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="break eggs in a pan and stir rapidly..."
          rows={5}
          value={recipe.directions}
          onChange={(e) => setRecipe({ ...recipe, directions: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" onClick={submitHandler}>
        Create {recipe.name} recipe
      </Button>
    </Form>
  );
};

export default AddRecipeForm;
