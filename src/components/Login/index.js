import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  //   createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./index.scss";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [isloggedIn, setLoggedin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setIsAuthenticated(true);

          Swal.fire({
            icon: "success",
            title: "Successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
      setIsAuthenticated(true);
    } catch (err) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleLogin}>
        <input
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input
          type="submit"
          className="login-submit-button"
          value="Login"
          name="Login"
        />
      </form>
      <button className="google-signin-button" onClick={loginWithGoogle}>
        Login With Google
      </button>
    </div>
  );
};

export default Login;
