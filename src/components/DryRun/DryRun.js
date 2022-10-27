import { useDataMutation } from "@dhis2/app-runtime";
import { Button, CircularLoader } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import styles from "./DryRun.module.css";

const mutation = {
    resource: "metadata",
    type: "create",
    params: {
        importMode: "VALIDATE",
        format: "json",
    },
    data: ({ metadata }) => ({ ...metadata }),
};

export const DryRun = ({ metadataPackage }) => {
    const [mutate, { data, loading, error }] = useDataMutation(mutation, {
        variables: {
            metadata: metadataPackage,
        },
    });

    if (error) {
        const filteredErrors = error.details.response.typeReports.filter(
            ({ objectReports }) => objectReports.length > 0
        );
        // const errorCount = filteredErrors.reduce((acc,typeReports)=>{
        //     return acc+typeReports.objectReports.length||0}
        // ,0)

        const flatMessagesArray = filteredErrors.map((objectError) => {
            const flattenedObjectReports = objectError.objectReports.reduce(
                (flat, or) => {
                    flat.push(or.errorReports[0].message);
                    return flat;
                },
                []
            );
            const objectName = objectError?.klass?.split(".")?.pop();
            return { objectName, errorMessages: flattenedObjectReports };
        });

        return flatMessagesArray.map((item) => {
            return (
                <div key={item.objectName}>
                    <div>
                        <span className={styles.errorTitle}>
                            {item.objectName}
                        </span>
                    </div>
                    {item.errorMessages.map((msg) => (
                        <div key={msg}>
                            <span className={styles.errorMessage}>{msg}</span>
                        </div>
                    ))}
                </div>
            );
        });
    }

    if (loading) {
        return <CircularLoader />;
    }
    return (
        <Button primary disabled={data || error} onClick={mutate}>
            Start dry run
        </Button>
    );
};

DryRun.propTypes = {
    metadataPackage: PropTypes.object,
};
