import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input";

import "./sign-in-form.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signinFields, setSigninFields] = useState(defaultFields);
  const { email, password } = signinFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninFields({ ...signinFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      setSigninFields(defaultFields);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Email or password is incorrect");
      }
    }
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
