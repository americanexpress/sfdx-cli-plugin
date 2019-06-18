# Installing the SFDX CLI Plugin

## Step 1. Install Node
Node is required for the plugin to run. Download and install the macOS Installer (.pkg) from the
[Node JS download page](https://nodejs.org/en/download/).

## Step 2. Install Yarn
Yarn is a package manager used by the plugin and can be installed using the following command.
```bash
sudo npm i yarn -g
```

## Step 3. Clone the repository.
Clone the repository to your local development folder.

## Step 4. Set environment variable(s)
Ensure that you have an environment variable **REPO** set to the project's parent folder. 
This is the directory where your development project(s) reside.

Set the variable as per the following example:
```bash
export REPO=/Users/yourusername/dev/
```

## Step 5. Add a global config
For configuration values across all projects, create the file **$HOME/.adp/plugin-config.json**.
An example is shown below.
```javascript
{
    "proxySettings": {
        "httpProxyHost": "myproxy.myorg.com",
        "httpProxyPort": "8888"
    },
    "talendSettings": {
        "dataOrgUsername": "releaseuser@myorg.com.uat",
        "jarDir": "$REPO/customjarsdirectory/",
        "jarDependenciesDir": "$REPO/customjarsdirectory/lib/",
        "projectDir": "data",
        "talendProjectName": "mytalendproject",
        "orgSetupDataClass": "zz6_scratch_admin",
        "soapApiVersion": "44.0",
        "uberJar": "talend.jar"
    },
    "restrictedOrgs": [
        "releaseuser@myorg.com",
            "releaseuser@myorg.com.sit",
            "releaseuser@myorg.com.uat"
    ]
}
```

## Step 6. Link the plugin to SFDX.
Use the following command to complete the installation.
```bash
sfdx plugins:link <path to project>
```

# Running Tests
## Running unit tests
To run unit tests only, execute the following command.
```bash
yarn test
```

## Running integration tests
These are longer-running tests that interact with modules and files external to the method under test.
To execute the integration tests tets, run the following command.

<span style="color: #aa0000">IMPORTANT: Some integration tests will fail unless there is at least one connected sandbox and one active scratch org returned by force:org:list. </span>
```bash
yarn integ
```

## Running all tests
To run all unit and integration tests, execute the following command.
```
yarn alltests
```