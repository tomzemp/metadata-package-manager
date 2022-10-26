import PropTypes from "prop-types";
import React, { useEffect } from "react";

export const FileUpload = ({ goToNextStep }) => {
    useEffect(() => {
        goToNextStep();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <span>This is where the file uploader goes</span>
        </div>
    );
};

FileUpload.propTypes = {
    goToNextStep: PropTypes.func,
};
