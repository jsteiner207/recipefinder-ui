import { useState } from "react";
import IngredientListForm from "./IngredientListForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IngredientListForm.css";

const recipes = [
  {
    name: "Chicken Sandwich",
    ingredients: ["chicken", "bread"],
    directions: "Cook chicken in skillet then put it on bread",
  },
  {
    name: "scrambled eggs",
    ingredients: ["egg", "salt"],
    directions:
      "crack eggs in skillet on medium heat and stir until fluffy, then salt to taste",
  },
  {
    name: "macaroni",
    ingredients: ["noodles", "milk", "butter", "cheddar cheese", "water"],
    directions:
      "boil water in skillet, then pour in macaroni and stir occasionally until soft. Then dump water out, and stir in cheese, butter, milk",
  },
];

const RecipeSearch = () => {

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    directions: "",
  });

  const getIngredients = (newIngredients) => {
    setRecipe({ ...recipe, ingredients: newIngredients });  };
  return (
    <>
      <IngredientListForm refreshIngredients={getIngredients} ingredients={recipe.ingredients} />

      <div className="search-result-container">
        {
          recipes.filter((currentRecipe) => {
            return currentRecipe.ingredients.some((r) => recipe.ingredients.includes(r));
          })
           .map((currentRecipe, index) => (
             <div key={index} className="search-result-item">
               {currentRecipe.name}
             </div>
           ))
        }
      </div>
    </>
  );
};

export default RecipeSearch;
