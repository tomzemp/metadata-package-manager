import { useDataQuery, useConfig } from "@dhis2/app-runtime";
import { Button } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import testPackage from "../lib/C19_CS_COMPLETE_1.0.2_DHIS2.37.json";
import { inspectMetadata } from "../lib/inspectMetadata.js";

console.log(testPackage);

const query = {
    categories: {
        resource: "categories",
        params: {
            paging: false,
            filter: "name:eq:default",
        },
    },
    categoryCombos: {
        resource: "categoryOptionCombos",
        params: {
            paging: false,
            filter: "name:eq:default",
        },
    },
    categoryOptions: {
        resource: "categoryOptions",
        params: {
            paging: false,
            filter: "name:eq:default",
        },
    },
    categoryOptionCombos: {
        resource: "categoryOptionCombos",
        params: {
            paging: false,
            filter: "name:eq:default",
        },
    },
    trackedEntityTypes: {
        resource: "trackedEntityTypes",
        params: {
            paging: false,
        },
    },
    indicatorTypes: {
        resource: "indicatorTypes",
        params: {
            paging: false,
        },
    },
};

export const Inspect = ({ goToNextStep, metadataPackage }) => {
    const { data } = useDataQuery(query, {
        onComplete: (data) => {
            const results = inspectMetadata(testPackage, data);
            // todo
        },
    });
    const { systemInfo } = useConfig();

    if (data && systemInfo) {
        return (
            <div>
                <span>{JSON.stringify(metadataPackage)}</span>
                <br />
                <span>Wrong DHIS2 version</span>
                <br />
                <span>Default disaggregation is different </span>
                <br />
                <span>
                    Do you want to map the tracked entity type to an existing
                    one?{" "}
                </span>
                <br />
                <span>Map indicator types</span>
                <br />
                <Button onClick={goToNextStep}>Go to dry run</Button>
            </div>
        );
    }
    return null;
};

Inspect.propTypes = {
    goToNextStep: PropTypes.func,
    metadataPackage: PropTypes.object,
};
