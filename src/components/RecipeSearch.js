import { useEffect, useState } from "react";
import IngredientListForm from "./IngredientListForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IngredientListForm.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";


const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([{
    name: "",
    ingredients: [],
    directions: "",
  }]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    directions: "",
  });

  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getRecipes();
  }, []);

  const getIngredients = (newIngredients) => {
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  return (
    <>
      <IngredientListForm
        refreshIngredients={getIngredients}
        ingredients={recipe.ingredients}
      />

      <div className="search-result-container">
        {recipes
          .filter((currentRecipe) => {
            return currentRecipe.ingredients.some((r) =>
              recipe.ingredients.includes(r)
            );
          })
          .map((currentRecipe, index) => (
            <div key={index} className="search-result-item">
              {currentRecipe.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default RecipeSearch;
