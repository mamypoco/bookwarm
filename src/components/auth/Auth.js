import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  //   createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloggedIn, setLoggedin] = useState(false);

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedin(true);
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedin(true);
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  return (
    <div>
      {/* need to add form here */}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
