import React, { useState } from "react";
import { DryRun } from "../DryRun/DryRun.js";
import { Finalize } from "../Finalize/Finalize.js";
import { Inspect } from "../Inspect/Inspect.js";
import { UploadPackage } from "../UploadPackage/UploadPackage.js";

export const Importer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metadataPackage, setMetadataPackage] = useState(null);

    const incrementStep = (step) => {
        return () => {
            setCurrentStep(step + 1);
        };
    };

    const steps = [
        {
            name: "Choose a package",
            component: (
                <UploadPackage
                    goToNextStep={incrementStep(0)}
                    onUpload={setMetadataPackage}
                />
            ),
            key: "selection",
        },
        {
            name: "Inspect",
            component: (
                <Inspect
                    goToNextStep={incrementStep(1)}
                    metadataPackage={metadataPackage}
                />
            ),
            key: "inspection",
        },
        { name: "Dry run", component: <DryRun />, key: "dry_run" },
        { name: "Finalize", component: <Finalize />, key: "finalization" },
    ];

    return (
        <>
            <h1>Metadata package manager</h1>
            {steps
                .filter((el, ix) => ix <= currentStep)
                .map(({ name, component, key }, index) => (
                    <div key={key}>
                        <h3>{`Step ${index + 1} ${name}`}</h3>
                        {component}
                    </div>
                ))}
        </>
    );
};
