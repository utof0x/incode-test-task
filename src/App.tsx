import { Route, Routes } from "react-router-dom";

import { Auth, Home } from "components";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
