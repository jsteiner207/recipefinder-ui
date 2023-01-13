import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { useState, useEffect } from "react";
  import { auth} from "./../components/firebase-config";



  const AuthForm = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  
    const [user, setUser] = useState({});
  
    useEffect(() => {
      const listen = onAuthStateChanged(auth, (loggeduser) =>  {
        if (loggeduser) {
          setUser(loggeduser);
        }
        else {
          setUser(null);
        }
      });
  
      return () => listen();}, []);
    
  
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
      </div>
     );
  }
   
  export default AuthForm ;