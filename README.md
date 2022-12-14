# metadata-package-manager
DHIS2 Hackathon 2022

## Tool for importing metadata packages and seeing package import history. 

### Start page:
Shows a list of imported packages, and an option to import a new package.

### Import process:
#### *Step 1: Upload package file for inspection and mapping*
#### *Step 2: View inspect information and perform mappings*
- Check package version against the backend version, based on file naming convention or comment/tag in the package itself. If the version does not match, the user will be warned of the mismatch.
- If package contains a default category, the app will remove it and link to the existig default category on the server. The user is informed about ths, but does not have the choice of importing a second default.
- If the package contains a tracked entity type, the user is presented with a list of all the types in the package. For each type, the user is asked wether to import it as a new type, or wether to replace with one of the servers existing types.
- If the package contains indicator types, the user is presented with a list of all the types in the package. For each type, the user is asked wether to import it as a new type, or wether to replace with one of the servers existing types.
- Compare the name for each data element in the package with existing data elements on the server. If the name is existing, but the uid does not match, the data element is flagged as a potential duplicate. For each of these data elements the user will be offered the opportunity to either go ahead and import the data element as is, or to replace it with an existing data element.
(More inspect and map options to come)
#### *Step 3: Dry run of import*
The import is attempted as a dry run, with the mappings and alternations from the previous step. The result of the dry run is presented to the user.
#### *Step 4: Import package*
The package is imported and persisted on the server. The imported package is stored in the history visible in the front page.
