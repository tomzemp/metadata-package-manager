import { useDataQuery, useConfig } from "@dhis2/app-runtime";
import { Button, CircularLoader, NoticeBox } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
// import testPackage from "../../lib/C19_CS_COMPLETE_1.0.2_DHIS2.37.json";
import { inspectMetadata } from "../../lib/inspectMetadata.js";
import styles from "./Inspect.module.css";

// console.log(testPackage);

const query = {
    categories: {
        resource: "categories",
        params: {
            paging: false,
            filter: "name:eq:default",
            fields: "id",
        },
    },
    categoryCombos: {
        resource: "categoryCombos",
        params: {
            paging: false,
            filter: "name:eq:default",
            fields: "id",
        },
    },
    categoryOptions: {
        resource: "categoryOptions",
        params: {
            paging: false,
            filter: "name:eq:default",
            fields: "id",
        },
    },
    categoryOptionCombos: {
        resource: "categoryOptionCombos",
        params: {
            paging: false,
            filter: "name:eq:default",
            fields: "id",
        },
    },
    trackedEntityTypes: {
        resource: "trackedEntityTypes",
        params: {
            paging: false,
            fields: "id,displayName",
        },
    },
    indicatorTypes: {
        resource: "indicatorTypes",
        params: {
            paging: false,
            fields: "id,displayName",
        },
    },
};

export const Inspect = ({ goToNextStep, metadataPackage }) => {
    const [results, setResults] = useState(null);
    const [defaultsResolved, setDefaultsResolved] = useState(false);
    const { serverVersion } = useConfig();
    useDataQuery(query, {
        onComplete: async (data) => {
            // fake function to simulate processing time
            await new Promise((e) => setTimeout(e, 300));
            const checkedResults = inspectMetadata({
                metadataPackage,
                data,
                serverVersion,
            });
            setResults(checkedResults);
        },
    });

    if (results && serverVersion) {
        return (
            <div>
                {results.versionWarning && (
                    <div className={styles.noticeBoxWrapper}>
                        <NoticeBox
                            title={results.versionWarning.title}
                            warning={true}
                        >
                            {results.versionWarning.message}
                        </NoticeBox>
                    </div>
                )}
                {results.defaultWarning?.title && !defaultsResolved && (
                    <div className={styles.noticeBoxWrapper}>
                        <NoticeBox
                            title={results.defaultWarning.title}
                            error={true}
                        >
                            {results.defaultWarning.message}
                        </NoticeBox>
                        <div className={styles.buttonWrapper}>
                            <Button
                                primary
                                onClick={() => {
                                    setDefaultsResolved(true);
                                }}
                            >
                                Use system defaults
                            </Button>
                        </div>
                    </div>
                )}
                {defaultsResolved && (
                    <div className={styles.noticeBoxWrapper}>
                        <NoticeBox title="Defaults resolved">
                            Package metadata defaults have been resolved to use
                            system values.
                        </NoticeBox>
                    </div>
                )}
                <br />
                {/* <span>
                    Do you want to map the tracked entity type to an existing
                    one?{" "}
                </span>
                <br />
                <span>Map indicator types</span>
                <br /> */}
                <div className={styles.proceedButton}>
                <Button onClick={goToNextStep}>Go to dry run</Button>
                </div>
            </div>
        );
    }
    return <CircularLoader />;
};

Inspect.propTypes = {
    goToNextStep: PropTypes.func,
    metadataPackage: PropTypes.object,
};
