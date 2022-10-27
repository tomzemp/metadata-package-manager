import { SingleSelect, SingleSelectOption, Radio } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./TrackedEntityTypeMapping.module.css";

export const TrackedEntityTypeMapping = ({ packageTET, options }) => {
    const [mapTET, setMapTET] = useState(true);
    const [mappedTET, selectedMappedTET] = useState(null);
    return (
        <div className={styles.tetBlock}>
            <span className={styles.tetTitle}>{packageTET.name}</span>
            <Radio
                onChange={() => {
                    setMapTET(true);
                }}
                checked={mapTET}
                dense
                value="true"
                label={"Map to existing tracked entity type in your system"}
            />
            {mapTET && (
                <div className={styles.selector}>
                    <SingleSelect
                        selected={mappedTET || ""}
                        placeholder={"Select an option"}
                        onChange={({ selected }) => {
                            selectedMappedTET(selected);
                        }}
                    >
                        {options.map((opt) => (
                            <SingleSelectOption
                                key={opt.displayName}
                                label={opt.displayName}
                                value={opt.id}
                            />
                        ))}
                    </SingleSelect>
                </div>
            )}
            <div className={styles.radioItem}>
                <Radio
                    onChange={() => {
                        setMapTET(false);
                    }}
                    checked={!mapTET}
                    dense
                    value="false"
                    label={"Import as new tracked entity type"}
                />
            </div>
        </div>
    );
};

TrackedEntityTypeMapping.propTypes = {
    options: PropTypes.array,
    packageTET: PropTypes.object,
};
