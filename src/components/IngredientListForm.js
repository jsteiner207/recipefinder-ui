import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./IngredientListForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseIngredients } from "./ingredients";
const IngredientListForm = (props) => {
  let newIngredients = props.ingredients;

  const [ing, setIng] = useState("");

  const removeIngredient = (index) => {
    newIngredients = newIngredients.filter((el, i) => i !== index);
    props.refreshIngredients(newIngredients);
  };

  const handleClickedResult = (ingredient) => {
    newIngredients.push(ingredient);
    setIng("");
    props.refreshIngredients(newIngredients);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    newIngredients.push(value);
    setIng("");
    props.refreshIngredients(newIngredients);
  };

  const ListOfIngredients = () => {
    return (
      ing !== "" && (
        <div className="search-result-container">
          {baseIngredients
            .filter((ingredient) => {
              return ingredient.includes(ing);
            })
            .map(
              (ingredient, index) =>
                index <= 10 && (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleClickedResult(ingredient)}
                  >
                    {ingredient}
                  </div>
                )
            )}
        </div>
      )
    );
  };

  return (
    <React.Fragment>
      {/* shows the selected tags */}
      <div className="tags-input-container">
        {props.ingredients.map((ingredient, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{ingredient}</span>
            <span className="close" onClick={() => removeIngredient(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>

      {/* where ingredients are entered */}
      <Form.Group className="mb-3" controlId="formRecipeIngredients">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          type="text"
          placeholder="eggs, butter, salt..."
          onKeyDown={handleKeyDown}
          onChange={(e) => setIng(e.target.value)}
          value={ing}
        />
      </Form.Group>
      <ListOfIngredients />
    </React.Fragment>
  );
};

export default IngredientListForm;
