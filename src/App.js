import React from "react";
import styles from "./App.module.css";
import { Importer } from "./Importer/Importer.js";
import "./locales/index.js";

const App = () => {
    return (
        <div className={styles.container}>
            <Importer />
        </div>
    );
};

export default App;
