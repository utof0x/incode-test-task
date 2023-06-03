import { useState } from "react";

import styles from "./Auth.module.scss";
import { Input, TextLogo } from "components";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={styles.wrapper}>
      <TextLogo />
      <div className={styles.form}>
        <div className={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</div>
        {isSignUp && <Input type="text" label="Full Name" />}
        <Input type="text" label="User Name" />
        <Input type="password" label="Password" />
        {isSignUp && <Input type="password" label="Confirm Password " />}
        <button className={styles.actionButton}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </div>
      <div className={styles.bottomText}>
        {isSignUp ? "Don’t have account yet?" : "I have an account."}
        &nbsp;
        <a
          href="/#"
          className={styles.changeAction}
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp((isSignUp) => !isSignUp);
          }}
        >
          {isSignUp ? "New Account" : "Go to Sign in"}
        </a>
      </div>
    </div>
  );
};
