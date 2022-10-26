import React, { useState } from "react";
import { DryRun } from "../DryRun/DryRun.js";
import { FileUpload } from "../FileUpload/FileUpload.js";
import { Finalize } from "../Finalize/Finalize.js";
import { Inspect } from "../Inspect/Inspect.js";

export const Importer = () => {
    const [currentStep, setCurrentStep] = useState(4);

    const incrementStep = (step) => {
        return () => {
            setCurrentStep(step + 1)
        }
    }

    const steps = [
        {
            name: "Choose a package",
            component: <FileUpload />,
            key: "selection",
        },
        { name: "Inspect", component: <Inspect goToNextStep={incrementStep(1)}/>, key: "inspection" },
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
