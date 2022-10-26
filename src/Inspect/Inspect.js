import { useDataQuery, useConfig } from "@dhis2/app-runtime";
import {Button} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from "react";


const query = {
    categoryCombos: {
        resource: "categoryCombos",
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

export const Inspect = ({goToNextStep}) => {
    const { data } = useDataQuery(query);
    const { systemInfo } = useConfig();

    if (data && systemInfo) {
        return (
            <div>
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
}