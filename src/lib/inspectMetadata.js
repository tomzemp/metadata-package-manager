// Objects which have a `default` that should not be duplicate in an instance
const DEFAULT_OBJECTS = [
    "categories",
    "categoryOptions",
    "categoryCombos",
    "categoryOptionCombos",
];

const DEFAULT_NAME = "default";

const checkDefaultObjects = (metadataPackage, targetSystemMetadata) => {
    const warnings = [];
    DEFAULT_OBJECTS.forEach((objectType) => {
        const serverId = targetSystemMetadata[objectType][objectType][0].id;
        const packageId = metadataPackage[objectType].find(
            ({ name }) => name === DEFAULT_NAME
        )?.id;
        if (packageId && packageId !== serverId) {
            warnings.push({ serverId, packageId, objectType });
        }
    });

    if (warnings.length > 0) {
        return {
            type: "error",
            title: "Inconsistent defaults",
            message: `The default ids for ${warnings
                .map(({ objectType }) => objectType)
                .sort()
                .join(
                    ", "
                )} are different between this metadata package and your system. Importing inconsistent defaults will cause system problems. Please resolve by clicking Use system defaults below or modify the metadata package and click Start over.`,
        };
    }
    return {};
};

const checkVersionCompatibility = ({ metadataPackage, serverVersion }) => {
    const DHIS2Version = metadataPackage.package.DHIS2Version;
    const packageMajorMinorVersion = DHIS2Version.split(".")
        .splice(0, 2)
        .join(".");
    const serverMajorMinorVersion = `${serverVersion.major}.${serverVersion.minor}`;

    if (packageMajorMinorVersion === serverMajorMinorVersion) {
        return null;
    }
    return {
        type: "warning",
        title: "Inconsistent versions",
        message: `This metadata package was created with DHIS2 version ${packageMajorMinorVersion}. You are using version ${serverMajorMinorVersion}. Importing metadata associated with a different version of DHIS2 may not work or may result in problems. It is recommended that you use a metadata package consistent with your system version.`,
    };
};

const checkTrackedEntityTypes = ({ metadataPackage, targetSystemMetadata }) => {
    const targetTrackedEntityTypes =
        targetSystemMetadata.trackedEntityTypes.trackedEntityTypes;
    const packageTrackedEntityTypes = metadataPackage.trackedEntityTypes;

    if (
        !(
            targetTrackedEntityTypes.length > 0 &&
            packageTrackedEntityTypes.length > 0
        )
    ) {
        return {};
    }

    return {
        title: "Potential duplicate tracked entity types",
        message:
            "Your system contains potential duplicate tracked entity types. Duplicate tracked entity types can cause problems in your system. It is recommended that you attempt to identify and map the metadata pacakage's tracked entity types to ones that exist in your system. If no matches find, import the tracked entity as new.",
        targetTrackedEntityTypes,
        packageTrackedEntityTypes,
    };
};

export const inspectMetadata = ({
    metadataPackage,
    data: targetSystemMetadata,
    serverVersion,
}) => {
    const defaultWarning = checkDefaultObjects(
        metadataPackage,
        targetSystemMetadata
    );

    const versionWarning = checkVersionCompatibility({
        metadataPackage,
        serverVersion,
    });

    const trackedEntityTypeWarning = checkTrackedEntityTypes({
        metadataPackage,
        targetSystemMetadata,
    });

    return {
        versionWarning,
        defaultWarning,
        trackedEntityTypeWarning,
    };
};
