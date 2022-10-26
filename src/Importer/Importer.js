import React from "react";
import { DryRun } from "../DryRun/DryRun.js";
import { FileUpload } from "../FileUpload/FileUpload.js";
import { Finalize } from "../Finalize/Finalize.js";
import { Inspect } from "../Inspect/Inspect.js";

export const Importer = () => {
    const steps = [
        { name: "Choose a package", component: <FileUpload />, key: 'selection' },
        { name: "Inspect", component: <Inspect />, key: 'inspection' },
        { name: "Dry run", component: <DryRun />, key: 'dry_run' },
        { name: "Finalize", component: <Finalize />, key: 'finalization' },
    ];

    return (
        <>
            <h1>Metadata package manager</h1>
            {steps.map(({ name, component, key }, index) => (
                <div key={key}>
                    <h3>{`Step ${index + 1} ${name}`}</h3>
                    {component}
                </div>
            ))}
        </>
    );
};
