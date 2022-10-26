import { CssVariables } from "@dhis2/ui";
import React from "react";
import styles from "./App.module.css";
import { Importer } from "./components/Importer/Importer.js";
import "./locales/index.js";

const App = () => {
    return (
        <>
            <CssVariables spacers colors theme />
            <div className={styles.container}>
                <Importer />
            </div>
        </>
    );
};

export default App;
