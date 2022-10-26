import {
    FileInput,
    FileList,
    FileListItem,
    FileListPlaceholder,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import i18n from "../../locales/index.js";

async function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
    });
}

export default function UploadPackage({ onUpload }) {
    const [file, setFile] = React.useState();

    const onChange = async (_, event) => {
        const [file] = event.target.files;
        setFile(file);
        const parsedPackage = await parseJsonFile(file);
        onUpload({ parsedPackage });
    };

    return (
        <>
            <FileInput
                type="file"
                buttonLabel={i18n.t("Upload package")}
                onChange={onChange}
                accept={".json"}
                name="uploadPackage"
            />
            <FileList>
                {file ? (
                    <FileListItem
                        label={file.name}
                        onRemove={() => setFile(null)}
                        removeText={i18n.t("Remove")}
                    />
                ) : (
                    <FileListPlaceholder>
                        {i18n.t("No package selected")}
                    </FileListPlaceholder>
                )}
            </FileList>
        </>
    );
}
UploadPackage.propTypes = {
    onUpload: PropTypes.func,
};
