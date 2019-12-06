sfdx-cli-plugin
==========

Overview
----------

As Salesforce engineers developing applications with DX, we created the SFDX CLI Plugin to make our day-to-day tasks a little easier.  Some of the functionality we've built includes:

  * Executing multiple apex files
  * Running Talend jobs to load data into an org or sandbox
  * Installing multiple unlocked packages
  * Deploying with predestruct and postdestruct operations
  * Executing queries via the tooling API

Our plugin was initially created using the plugin-generator, itself a plugin that comes bundled with the CLI installation. The plugin generator is based on Heroku's open-source CLI framework, [OCLIF](https://oclif.io).

If you want to create your own plugin from scratch, you can get started [here](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html). However, we'd be delighted if you decided to collaborate with us to make this plugin even better!

Intalling Dependencies
----------------------
Use the following command to install all dependencies upon initial checkout.
```
yarn install
```

Running Tests
-------------
In this project pure unit tests are separated from integration tests. Tests can be run using one of the commands below:
  * `yarn test` - unit tests only
  * `yarn integ` - integration tests only
  * `yarn alltests` - unit and integration tests

Please see our other documentation:
  * [Contributing](./docs//CONTRIBUTING.md)
  * [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
  * [Project Structure](./docs/PROJECT_STRUCTURE.md)
  * [Setup](./docs/SETUP.md)

Command Summary
----------------

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-cli-plugin
$ sfdx-cli-plugin COMMAND
running command...
$ sfdx-cli-plugin (-v|--version|version)
sfdx-cli-plugin/0.0.5 darwin-x64 node-v11.13.0
$ sfdx-cli-plugin --help [COMMAND]
USAGE
  $ sfdx-cli-plugin COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx-cli-plugin adp:apex:execute`](#sfdx-cli-plugin-adpapexexecute)
* [`sfdx-cli-plugin adp:auth:soap:login`](#sfdx-cli-plugin-adpauthsoaplogin)
* [`sfdx-cli-plugin adp:config:show`](#sfdx-cli-plugin-adpconfigshow)
* [`sfdx-cli-plugin adp:data:run`](#sfdx-cli-plugin-adpdatarun)
* [`sfdx-cli-plugin adp:package:install`](#sfdx-cli-plugin-adppackageinstall)
* [`sfdx-cli-plugin adp:package:installed:list`](#sfdx-cli-plugin-adppackageinstalledlist)
* [`sfdx-cli-plugin adp:package:list`](#sfdx-cli-plugin-adppackagelist)
* [`sfdx-cli-plugin adp:package:retrieve`](#sfdx-cli-plugin-adppackageretrieve)
* [`sfdx-cli-plugin adp:package:retrieve:postdestruct`](#sfdx-cli-plugin-adppackageretrievepostdestruct)
* [`sfdx-cli-plugin adp:package:retrieve:predestruct`](#sfdx-cli-plugin-adppackageretrievepredestruct)
* [`sfdx-cli-plugin adp:package:uninstall`](#sfdx-cli-plugin-adppackageuninstall)
* [`sfdx-cli-plugin adp:rest:query`](#sfdx-cli-plugin-adprestquery)
* [`sfdx-cli-plugin adp:rest:upsert`](#sfdx-cli-plugin-adprestupsert)
* [`sfdx-cli-plugin adp:shell:run`](#sfdx-cli-plugin-adpshellrun)
* [`sfdx-cli-plugin adp:shell:runjar`](#sfdx-cli-plugin-adpshellrunjar)
* [`sfdx-cli-plugin adp:source:deploy`](#sfdx-cli-plugin-adpsourcedeploy)
* [`sfdx-cli-plugin adp:source:destruct`](#sfdx-cli-plugin-adpsourcedestruct)
* [`sfdx-cli-plugin adp:source:destructive:prepare`](#sfdx-cli-plugin-adpsourcedestructiveprepare)
* [`sfdx-cli-plugin adp:source:prepare`](#sfdx-cli-plugin-adpsourceprepare)
* [`sfdx-cli-plugin adp:tooling:query`](#sfdx-cli-plugin-adptoolingquery)
* [`sfdx-cli-plugin adp:tooling:update`](#sfdx-cli-plugin-adptoolingupdate)

## `sfdx-cli-plugin adp:apex:execute`

Iterates through and executes apex files in the specified directory

```
USAGE
  $ sfdx-cli-plugin adp:apex:execute

OPTIONS
  -d, --directory=directory                       (required) path to directory containing Apex code files
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:apex:execute -d deploy/scripts -u myorg
           // Executes the files in the scripts directory for the target alias, myorg
```

_See code: [src/commands/adp/apex/execute.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/apex/execute.ts)_

## `sfdx-cli-plugin adp:auth:soap:login`

Authenticates a user via the SOAP API.

```
USAGE
  $ sfdx-cli-plugin adp:auth:soap:login

OPTIONS
  -p, --password=password                         Salesforce login password
  -r, --loginurl=loginurl                         Salesforce login URL
  -u, --username=username                         Salesforce username
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:auth:soap:login -u myusername -p mypassword
```

_See code: [src/commands/adp/auth/soap/login.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/auth/soap/login.ts)_

## `sfdx-cli-plugin adp:config:show`

Displays global and local configuration settings

```
USAGE
  $ sfdx-cli-plugin adp:config:show

OPTIONS
  -g, --globalonly                                show global config only
  -l, --localonly                                 show local config only
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:config:show
  sfdx adp:config:show -g
  sfdx adp:config:show -l
```

_See code: [src/commands/adp/config/show.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/config/show.ts)_

## `sfdx-cli-plugin adp:data:run`

Runs a job to retrieve from or push data to an org.

```
USAGE
  $ sfdx-cli-plugin adp:data:run

OPTIONS
  -c, --classname=classname                       Java class name of job to run
  -p, --sandboxpassword=sandboxpassword           Password for target org if sandbox
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

DESCRIPTION
  Available Job Types: get, put, delete

EXAMPLES
  sfdx adp:data:run
           // Runs job in interactive mode (easiest)
        
  sfdx adp:data:run -c a1_get_visibility_rules -p mypassword
           // Runs job without user interaction
```

_See code: [src/commands/adp/data/run.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/data/run.ts)_

## `sfdx-cli-plugin adp:package:install`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx-cli-plugin adp:package:install

OPTIONS
  -a, --allpackages                               All packages, not just dependencies

  -b, --versionbias=(Latest|Released)             Type of bias to use when determining package versions
                                                  (Latest|Released)

  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org

  --apiversion=apiversion                         override the api version used for api requests made by this command

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

  --noprompt                                      disables all prompts

EXAMPLES
  sfdx adp:package:install
  sfdx adp:package:install -u xfrom1
  sfdx adp:package:install -u xfrom1 -l
```

_See code: [src/commands/adp/package/install.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/install.ts)_

## `sfdx-cli-plugin adp:package:installed:list`

Compares install package versions with version specified in sfdx-project.json

```
USAGE
  $ sfdx-cli-plugin adp:package:installed:list

OPTIONS
  -a, --allpackages                               All packages, not just dependencies
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:package:installed:list -u xfrom1
           // Lists the dependencies and the install status of each for the specified target username
```

_See code: [src/commands/adp/package/installed/list.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/installed/list.ts)_

## `sfdx-cli-plugin adp:package:list`

Lists the current package and all its dependencies

```
USAGE
  $ sfdx-cli-plugin adp:package:list

OPTIONS
  -a, --allpackages                               all packages, not just dependencies

  -b, --versionbias=(Latest|Released)             type of bias to use when determining package versions
                                                  (Latest|Released)

  -v, --verbose                                   display extended package version details

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:package:list
           // Lists the current package and all its dependent packages
        
  sfdx adp:package:list -v
           // Lists the packages with extended details, e.g. actual version number, release status and subscriber 
  version ID
        
  sfdx adp:package:list -v -b my_branch
           // Lists the packages belonging to the specified branch
```

_See code: [src/commands/adp/package/list.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/list.ts)_

## `sfdx-cli-plugin adp:package:retrieve`

Retrieves a developer package, converts, and merges it into the local source

```
USAGE
  $ sfdx-cli-plugin adp:package:retrieve

OPTIONS
  -p, --package=package                           (required) Package or change set to retrieve
  -q, --quietmode                                 bypasses all user interaction

  -t, --target=target                             [default: force-app] Destination directory for conversion output.
                                                  Defaults to force-app.

  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org

  --apiversion=apiversion                         override the api version used for api requests made by this command

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName
         // pulls the specified package from the org and converts/merges it into force-app
      
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName -t TargetDir
         // pulls a package from the org and converts/merges it into /TargetDir
      
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName -q
         // performs the retrieve-unzip-convert in Quiet mode, i.e without feedback
```

_See code: [src/commands/adp/package/retrieve.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/retrieve.ts)_

## `sfdx-cli-plugin adp:package:retrieve:postdestruct`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx-cli-plugin adp:package:retrieve:postdestruct

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:package:retrieve:postdestruct
           // Retrieves the "postdestruct" package from the org associated with the default username
        
  sfdx adp:package:retrieve:postdestruct -u myalias
           // Retrieves the "postdestruct" package from the org having username/alias "myalias"
```

_See code: [src/commands/adp/package/retrieve/postdestruct.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/retrieve/postdestruct.ts)_

## `sfdx-cli-plugin adp:package:retrieve:predestruct`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx-cli-plugin adp:package:retrieve:predestruct

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:package:retrieve:predestruct
           // Retrieves the "predestruct" package from the org associated with the default username
        
  sfdx adp:package:retrieve:predestruct -u myalias
           // Retrieves the "predestruct" package from the org having username/alias "myalias"
```

_See code: [src/commands/adp/package/retrieve/predestruct.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/retrieve/predestruct.ts)_

## `sfdx-cli-plugin adp:package:uninstall`

Uninstalls the current package and/or its dependencies

```
USAGE
  $ sfdx-cli-plugin adp:package:uninstall

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
  --noprompt                                      disables all prompts

EXAMPLES
  sfdx adp:package:uninstall
  sfdx adp:package:uninstall -u xfrom1
  sfdx adp:package:uninstall --noprompt
```

_See code: [src/commands/adp/package/uninstall.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/package/uninstall.ts)_

## `sfdx-cli-plugin adp:rest:query`

Executes a SOQL query via the Tooling API

```
USAGE
  $ sfdx-cli-plugin adp:rest:query

OPTIONS
  -a, --accesstoken=accesstoken                   (required) OAuth access token with bang (!) escaped
  -e, --endpoint=endpoint                         (required) Salesforce SOAP API endpoint
  -m, --maxfetch=maxfetch                         Max records to fetch
  -q, --query=query                               (required) SOQL query string
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5"
  sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5" -m 100
```

_See code: [src/commands/adp/rest/query.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/rest/query.ts)_

## `sfdx-cli-plugin adp:rest:upsert`

Executes an Upsert via the REST API

```
USAGE
  $ sfdx-cli-plugin adp:rest:upsert

OPTIONS
  -a, --accesstoken=accesstoken                   (required) OAuth access token with bang (!) escaped
  -e, --endpoint=endpoint                         (required) Salesforce SOAP API endpoint
  -o, --objectjson=objectjson                     (required) JSON array of objects to upsert
  -t, --objecttype=objecttype                     (required) Type of object to upsert
  -x, --externalidfield=externalidfield           (required) Name of external id field
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:rest:upsert -t User -o '[{"Ext_Id": "0GQ46000000LA9NGAW", "FirstName": "Xavier"}]' -e https://myinstance.com 
  -a myaccesstoken
```

_See code: [src/commands/adp/rest/upsert.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/rest/upsert.ts)_

## `sfdx-cli-plugin adp:shell:run`

Runs shell script

```
USAGE
  $ sfdx-cli-plugin adp:shell:run

OPTIONS
  -a, --args=args                                 argument list
  -f, --file=file                                 shell script file to run
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:shell:run
           // Runs <project>/.epsf/bash/build.sh
        
  sfdx adp:shell:run -f "test.sh"
           // Runs shell script from <project>/.epsf/bash
        
  sfdx adp:shell:run -f "test/resources/bash/test.sh"
           // Runs the specified shell script (outside of DX project)
        
  sfdx adp:shell:run -f "test.sh cow moon"
           // Runs script with parameters
```

_See code: [src/commands/adp/shell/run.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/shell/run.ts)_

## `sfdx-cli-plugin adp:shell:runjar`

Executes a JAR file with the specified pipe-delimited parameters.

```
USAGE
  $ sfdx-cli-plugin adp:shell:runjar

OPTIONS
  -a, --arguments=arguments                       pipe-delimited jar file arguments
  -j, --jarfile=jarfile                           (required) path to jar file

  --classpath=classpath                           a colon(:)-delimited list of directories, JAR archives or ZIP archives
                                                  to search for class files

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:shell:runjar -j MyJarFile.jar
           // Executes jar file MyJarFile.jar with no arguments
        
  sfdx adp:shell:runjar -j MyJarFile.jar -a 3500
           // Executes jar file MyJarFile.jar with a single argument that does not contain spaces
        
  sfdx adp:shell:runjar -j MyJarFile.jar -a 'My first arg'
           // Passing a single argument that contains spaces
        
  sfdx adp:shell:runjar -j MyJarFile.jar -a "My first arg|1000"
           // Passing 2 arguments when one or more contains spaces
```

_See code: [src/commands/adp/shell/runjar.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/shell/runjar.ts)_

## `sfdx-cli-plugin adp:source:deploy`

Deploys the source to a non-tracked org

```
USAGE
  $ sfdx-cli-plugin adp:source:deploy

OPTIONS
  -b, --debugmode                                 performs mdapi conversion but skips deployment
  -c, --checkonly                                 validate deploy but don’t save to the org

  -l, --testlevel=testlevel                       [default: RunAllTestsInOrg]
                                                  NoTestRun|RunSpecifiedTests|RunLocalTests|RunAllTestsInOrg

  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org

  --apiversion=apiversion                         override the api version used for api requests made by this command

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

  --noanonymous                                   exclude pre and post anonymous Apex execution commands (excluded from
                                                  override)

  --nodestructives                                exclude pre and post destructive commands (excluded from override)

  --nomain                                        exclude main payload deployment

EXAMPLES
  sfdx adp:source:deploy
           // Runs sequence of commands required to deploy the monolith based on default username
  sfdx adp:source:deploy -u myalias
           // Runs sequence of commands required to deploy the monolith to the specified org/alias
  sfdx adp:source:deploy -c
           // Performs validation deploy only
  sfdx adp:source:deploy -l NoTestRun
           // Deploys without tests
  sfdx adp:source:deploy -b
           // Runs the deployment in debug mode
  sfdx adp:source:deploy --noanonymous
           // Excludes pre and post anonymous Apex execution commands (not passed to override)
  sfdx adp:source:deploy --nodestructives
           // Excludes pre and post destructive metadata (not passed to override)
```

_See code: [src/commands/adp/source/deploy.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/source/deploy.ts)_

## `sfdx-cli-plugin adp:source:destruct`

Generates a destructiveChanges.xml manifest

```
USAGE
  $ sfdx-cli-plugin adp:source:destruct

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:source:destruct -u myscratch
           // Generates a destructiveChanges.xml file for metadata deletions on the tracked org
```

_See code: [src/commands/adp/source/destruct.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/source/destruct.ts)_

## `sfdx-cli-plugin adp:source:destructive:prepare`

Replaces (*) elements in the destructive package.xml with destructive elements specified by name

```
USAGE
  $ sfdx-cli-plugin adp:source:destructive:prepare

OPTIONS
  -d, --destructsrcdir=destructsrcdir             (required) MDAPI-formatted source to destruct
  -f, --destructivexml=destructivexml             Destructive XML file to prepare
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:source:destructive:prepare -f $POST_DESTRUCT_XML -d $CONVERTED_POST_DESTRUCT_DIR
           // Prepares the destructive xml file specifed by -f based on the converted source directory specified after 
  -d.
```

_See code: [src/commands/adp/source/destructive/prepare.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/source/destructive/prepare.ts)_

## `sfdx-cli-plugin adp:source:prepare`

Prepares the source for deployment using the pre-deployment transforms configured in plugin-config.json

```
USAGE
  $ sfdx-cli-plugin adp:source:prepare

OPTIONS
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:source:prepare
           // Transforms the source under force-app as configured in the project plugin-config.json
```

_See code: [src/commands/adp/source/prepare.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/source/prepare.ts)_

## `sfdx-cli-plugin adp:tooling:query`

Executes a SOQL query via the Tooling API

```
USAGE
  $ sfdx-cli-plugin adp:tooling:query

OPTIONS
  -m, --maxfetch=maxfetch                         Max records to fetch
  -p, --password=password                         (required) Salesforce password
  -q, --query=query                               (required) SOQL query string
  -r, --loginurl=loginurl                         Use https://test.salesforce.com for sandbox
  -u, --username=username                         (required) Salesforce username
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  sfdx adp:tooling:query -u USERNAME -p PASSWORD -q "SELECT id FROM SandboxInfo"
  sfdx adp:tooling:query -r https://test.salesforce.com -u USERNAME -p PASSWORD -q "SELECT id FROM SandboxInfo" -m 100
```

_See code: [src/commands/adp/tooling/query.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/tooling/query.ts)_

## `sfdx-cli-plugin adp:tooling:update`

Executes an update via the Tooling API

```
USAGE
  $ sfdx-cli-plugin adp:tooling:update

OPTIONS
  -a, --accesstoken=accesstoken                   (required) OAuth access token with bang (!) escaped
  -e, --endpoint=endpoint                         (required) Salesforce SOAP API endpoint
  -o, --objectjson=objectjson                     (required) Object to update
  -t, --objecttype=objecttype                     (required) Type of object to update
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  sfdx adp:tooling:update -t SandboxInfo -o '{"Id": "0GQ46000000LA9NGAW", "LicenseType": "DEVELOPER", "AutoActivate": 
  true}' -e https://myinstance.com -a myaccesstoken
```

_See code: [src/commands/adp/tooling/update.ts](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.5/src/commands/adp/tooling/update.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
Assuming you're using VSCode, included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!

## Contributing

  We welcome Your interest in the American Express Open Source Community on Github.
  Any Contributor to any Open Source Project managed by the American Express Open
  Source Community must accept and sign an Agreement indicating agreement to the
  terms below. Except for the rights granted in this Agreement to American Express
  and to recipients of software distributed by American Express, You reserve all
  right, title, and interest, if any, in and to Your Contributions. Please [fill
  out the Agreement](https://cla-assistant.io/americanexpress/sfdx-cli-plugin).

  Please feel free to open pull requests and see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for commit formatting details.

  ## License

  Any contributions made under this project will be governed by the [Apache License
  2.0](https://github.com/americanexpress/sfdx-cli-plugin/blob/master/LICENSE.txt).

  ## Code of Conduct

  This project adheres to the [American Express Community Guidelines](./CODE_OF_CONDUCT.md).
  By participating, you are expected to honor these guidelines.
