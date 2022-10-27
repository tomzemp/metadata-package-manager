import { Button, Divider, IconCheckmarkCircle24, colors } from "@dhis2/ui";
import React, { useState } from "react";
import { DryRun } from "../DryRun/DryRun.js";
import { Finalize } from "../Finalize/Finalize.js";
import { Inspect } from "../Inspect/Inspect.js";
import { UploadPackage } from "../UploadPackage/UploadPackage.js";
import styles from "./Importer.module.css";

export const Importer = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metadataPackage, setMetadataPackage] = useState(null);

    const incrementStep = (step) => {
        return () => {
            setCurrentStep(step + 1);
        };
    };

    const goToBeginning = () => setCurrentStep(0);

    const steps = [
        {
            name: "Choose a package",
            component: (
                <UploadPackage
                    goToBeginning={goToBeginning}
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
        {
            name: "Dry run",
            component: <DryRun metadataPackage={metadataPackage} />,
            key: "dry_run",
        },
        { name: "Finalize", component: <Finalize />, key: "finalization" },
    ];

    return (
        <>
            <div className={styles.headerWrapper}>
                <h1>Metadata package manager</h1>
                <Button destructive onClick={goToBeginning}>
                    Start over
                </Button>
            </div>
            {steps.map(({ name, component, key }, index) => {
                let stepStyle;
                if (index === currentStep) {
                    stepStyle = styles.inProgressStep;
                }
                if (index > currentStep) {
                    stepStyle = styles.waitingStep;
                }
                if (index < currentStep) {
                    stepStyle = styles.completedStep;
                }
                return (
                    <div key={key}>
                        <div>
                            <div className={styles.stepHeaderWrapper}>
                                {index < currentStep && (
                                    <IconCheckmarkCircle24
                                        color={colors.green500}
                                    />
                                )}

                                <h3 className={stepStyle}>{`Step ${
                                    index + 1
                                }. ${name}`}</h3>
                            </div>
                            {index === currentStep && component}
                        </div>
                        <Divider />
                    </div>
                );
            })}
        </>
    );
};
