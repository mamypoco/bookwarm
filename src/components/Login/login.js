import { useState } from "react";
import { auth, googleProvider, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./login.scss";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
            title: "Successfully registered and logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } catch (error) {
      console.log(error);
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
      <h1>BookWarm</h1>

      <form
        className="login-form"
        onSubmit={
          document.activeElement.name === "Login" ? handleLogin : handleRegister
        }
      >
        <div className="row-div">
          <input
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row-div">
          <input
            placeholder="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button className="google-signin-button" onClick={loginWithGoogle}>
          Login With Google
        </button>
        <div className="row-div">
          <input
            type="submit"
            className="login-submit-button"
            value="Login"
            name="Login"
          />
        </div>
        <div className="row-div">
          <input
            className="register-submit-button"
            type="submit"
            value="Register"
            name="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
