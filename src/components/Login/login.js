import { useState } from "react";
import { auth, googleProvider, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import "./login.scss";
import Swal from "sweetalert2";
// import heroImage from "../../../src/assets/images/hero.jpg";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter;
    if (submitter.name === "Login") {
      handleLogin(e);
    } else if (submitter.name === "Register") {
      handleRegister(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        //   willOpen: () => {
        //     Swal.showLoading();
        //   },
        //   willClose: () => {
        //     setIsAuthenticated(true);

        //  Swal.fire({
        icon: "success",
        title: "Successfully logged in!",
        // showConfirmButton: false,
        //   timer: 1500,
      });
      //   },
      // });
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
      //set isRegistering true
      if (!isRegistering) {
        setIsRegistering(true);
        return;
      }
      //prompt user to enter their name
      const { value: name } = await Swal.fire({
        title: "Enter your name",
        input: "text",
        inputLabel: "Name",
        inputPlaceholder: "Enter your name",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter your name!";
          }
        },
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Register",
        allowOUtsideClick: false,
      });
      if (name) {
        //if name exists, create user with email and password
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //update user profile with name
        await updateProfile(user, {
          displayName: name,
        });

        //store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
          displayName: name,
          email: user.email,
        });
        //   await db.collection("users").doc(user.uid).set({
        //     displayName: name,
        //   });

        setIsAuthenticated(true);
        Swal.fire({
          icon: "success",
          title: "Successfully registered and logged in!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
    <div className="hero-container">
      {/* <img className="hero-image" src={heroImage} alt="hero" /> */}

      <div className="login-container">
        <h1>Bookwarm</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <button className="google-signin-button" onClick={loginWithGoogle}>
            Login With Google
          </button>
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

          <div className="row-div">
            <input
              className="register-submit-button"
              type="submit"
              value="Register"
              name="Register"
            />
          </div>
          <div className="row-div">
            <input
              type="submit"
              className="login-submit-button"
              value="Login"
              name="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
