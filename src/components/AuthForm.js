import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { auth } from "./../components/firebase-config";
import IngredientListForm from "./IngredientListForm";
import { db } from "./firebase-config";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const AuthForm = () => {
  const fridgeRef = collection(db, "Fridge");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const userData = useRef([]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: ["cheese"],
    directions: "",
  });

  const getIngredients = async (newIngredients) => {
    console.log(userData.current);
    const washingtonRef = doc(db, "Fridge", userData.current[0].id);
    await updateDoc(washingtonRef, {
      ingredients: newIngredients,
    });
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (loggeduser) => {
      if (loggeduser) {
        console.log(loggeduser.uid);
        const userIngredientsRes = query(
          fridgeRef,
          where("uid", "==", loggeduser.uid)
        );
        const data = await getDocs(userIngredientsRes);
        userData.current = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecipe({ ...recipe, ingredients: userData.current[0].ingredients });
        setUser(loggeduser);
      } else {
        setUser(null);
      }
    });
    //setRecipe({ ...recipe, ingredients: newIngredients })
    return () => listen();
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>

      <IngredientListForm
        refreshIngredients={getIngredients}
        ingredients={recipe.ingredients}
      />
    </div>
  );
};

export default AuthForm;
