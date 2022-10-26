# metadata-package-manager
DHIS2 Hackathon 2022

## Tool for importing metadata packages and seeing package import history. 

### Start page:
Shows a list of imported packages, and an option to import a new package.

### The import process consists of 4 steps:
#### *Step 1: Upload package file for inspection and mapping*
#### *Step 2: View inspect information and perform mappings*
- Check package version against the backend version, based on file naming convention or comment/tag in the package itself. If the version does not match, the user will be warned of the mismatch.
- If package contains a default category, or a link to the default category, we link to the existig default category instead. The user is informed about ths, but does not have the choice of importing a second default.
- If the package contains indicator types, the package indicator types are listed, and the user can optionally match the each one to existing indicator type.
(More inspect and map options to come)
#### *Step 3: Dry run of import*
The import is attempted as a dry run, with the mappings and alternations from the previous step. The result of the dry run is presented to the user.
#### *Step 4: Import package*
The package is imported and persisted on the server. The imported package is stored in the history visible in the front page.
