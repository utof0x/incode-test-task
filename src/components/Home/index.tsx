import { Navigate } from "react-router-dom";

import styles from "./Home.module.scss";
import { TextLogo } from "components";
import { decor, happyPeople } from "assets/images";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "store/actions/auth";

export const Home = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!isLoggedIn) {
    return <Navigate replace to="/auth" />;
  }

  return (
    <div className={styles.wrapper}>
      <TextLogo />
      <div className={styles.content}>
        <div className={styles.title}>
          Congratulations
          <img
            className={styles.titleDecoration}
            src={decor}
            alt="Decoration"
          />
        </div>
        <div className={styles.subtitle}>
          Now you are on the main page. Soon we will provide you with detailed
          feedback on the result of your work
        </div>
        <button className={styles.logout} onClick={() => dispatch(logout())}>
          Log Out
        </button>
        <img
          className={styles.bottomImage}
          src={happyPeople}
          alt="Happy people"
        />
      </div>
    </div>
  );
};
