import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Navigate } from "react-router-dom";

import styles from "./Auth.module.scss";
import { Input, TextLogo } from "components";
import { logInSchema, signUpSchema } from "utils/schemas";
import { useAppDispatch, useAppSelector } from "hooks";
import { signIn, signUp } from "store/actions/auth";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <TextLogo />
      <Formik
        initialValues={{
          fullName: "",
          username: "",
          password: "",
          passwordRepeat: "",
        }}
        validationSchema={isSignUp ? signUpSchema : logInSchema}
        onSubmit={(values) => {
          const { fullName, username, password } = values;
          if (isSignUp) {
            dispatch(signUp({ displayName: fullName, username, password }));
          } else {
            dispatch(signIn({ username, password }));
          }
        }}
      >
        {({ values, errors, touched, setValues }) => (
          <Form className={styles.form}>
            <div className={styles.title}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </div>
            {isSignUp && (
              <Field
                as={Input}
                name="fullName"
                type="text"
                label="Full Name"
                value={values.fullName}
                error={errors.fullName && touched.fullName}
                onChange={(value: string) =>
                  setValues({ ...values, fullName: value })
                }
              />
            )}
            <Field
              as={Input}
              name="username"
              type="text"
              label="User Name"
              value={values.username}
              error={errors.username && touched.username}
              onChange={(value: string) =>
                setValues({ ...values, username: value })
              }
            />
            <Field
              as={Input}
              name="password"
              type="password"
              label="Password"
              value={values.password}
              error={errors.password && touched.password}
              onChange={(value: string) =>
                setValues({ ...values, password: value })
              }
            />
            {isSignUp && (
              <Field
                as={Input}
                name="passwordRepeat"
                type="password"
                label="Confirm Password"
                value={values.passwordRepeat}
                error={errors.passwordRepeat && touched.passwordRepeat}
                onChange={(value: string) =>
                  setValues({ ...values, passwordRepeat: value })
                }
              />
            )}
            <button className={styles.actionButton} type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.bottomText}>
        {isSignUp ? "I have an account." : "Don’t have account yet?"}
        &nbsp;
        <a
          href="/#"
          className={styles.changeAction}
          onClick={(e) => {
            e.preventDefault();
            setIsSignUp((isSignUp) => !isSignUp);
          }}
        >
          {isSignUp ? "Go to Sign in" : "New Account"}
        </a>
      </div>
    </div>
  );
};
