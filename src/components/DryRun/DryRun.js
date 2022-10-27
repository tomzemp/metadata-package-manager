import { useDataMutation } from "@dhis2/app-runtime";
import { Button } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

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
    const [mutate, { data, error }] = useDataMutation(mutation, {
        variables: {
            metadata: metadataPackage,
        },
    });

    return (
        <div>
            <Button primary disabled={data || error} onClick={mutate}>
                Start dry run
            </Button>
            {error && (
                <>
                    {/* {JSON.stringify(Object.keys(error))} */}
                    {JSON.stringify(
                        error.details.response.typeReports.filter(
                            ({ objectReports }) => objectReports.length > 0
                        )
                    )}
                </>
            )}
        </div>
    );
};

DryRun.propTypes = {
    metadataPackage: PropTypes.object,
};
