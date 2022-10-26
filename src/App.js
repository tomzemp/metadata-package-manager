import { DataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import classes from "./App.module.css";
import UploadPackage from "./components/upload-package/upload-package.js";
import "./locales/index.js";

const query = {
    me: {
        resource: "me",
    },
};

const MyApp = () => (
    <div className={classes.container}>
        <UploadPackage />
    </div>
);

export default MyApp;
