// Objects which have a `default` that should not be duplicate in an instance
const DEFAULT_OBJECTS = [
    "categories",
    "categoryOptions",
    "categoryCombos",
    "categoryOptionCombos",
];

const checkDefaultObjects = (metadataPackage) => {
    const warnings = []
}

export const inspectMetadata = (metadataPackage) => {
    const defaultWarnings = checkDefaultObjects(metadataPackage)

    return {
        versionWarnings: [],
        defaultWarnings: []
    }
}