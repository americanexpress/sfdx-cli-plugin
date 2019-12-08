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
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-cli-plugin/0.0.6 darwin-x64 node-v11.13.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx adp:apex:execute -d [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpapexexecute--d--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:auth:soap:login [-u <string>] [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpauthsoaplogin--u-string--p-string--r-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:config:show [-g] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpconfigshow--g--l---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:data:run [-c <string>] [-p <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpdatarun--c-string--p-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:install [-a] [-b Latest|Released] [--noprompt] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageinstall--a--b-latestreleased---noprompt--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:installed:list [-a] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageinstalledlist--a--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:list [-a] [-b Latest|Released] [-v] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackagelist--a--b-latestreleased--v---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:retrieve -p <string> [-q] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageretrieve--p-string--q--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:retrieve:postdestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageretrievepostdestruct--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:retrieve:predestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageretrievepredestruct--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:package:uninstall [--noprompt] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adppackageuninstall---noprompt--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:rest:query -q <string> -a <string> -e <string> [-m <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adprestquery--q-string--a-string--e-string--m-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:rest:upsert -o <string> -t <string> -x <string> -a <string> -e <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adprestupsert--o-string--t-string--x-string--a-string--e-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:shell:run [-f <string>] [-a <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpshellrun--f-string--a-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:shell:runjar -j <string> [--classpath <string>] [-a <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpshellrunjar--j-string---classpath-string--a-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:source:deploy [-b] [-c] [--noanonymous] [--nodestructives] [--nomain] [-l <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpsourcedeploy--b--c---noanonymous---nodestructives---nomain--l-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:source:destruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpsourcedestruct--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:source:destructive:prepare -d <string> [-f <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpsourcedestructiveprepare--d-string--f-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:source:prepare [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adpsourceprepare---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:tooling:query -q <string> -u <string> -p <string> [-m <number>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adptoolingquery--q-string--u-string--p-string--m-number--r-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx adp:tooling:update -o <string> -t <string> -a <string> -e <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-adptoolingupdate--o-string--t-string--a-string--e-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx adp:apex:execute -d [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Iterates through and executes apex files in the specified directory

```
USAGE
  $ sfdx adp:apex:execute -d [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --directory                                                                   (required) path to directory
                                                                                    containing Apex code files

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:apex:execute -d deploy/scripts -u myorg
           // Executes the files in the scripts directory for the target alias, myorg
```

_See code: [lib/commands/adp/apex/execute.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/apex/execute.js)_

## `sfdx adp:auth:soap:login [-u <string>] [-p <string>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Authenticates a user via the SOAP API.

```
USAGE
  $ sfdx adp:auth:soap:login [-u <string>] [-p <string>] [-r <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --password=password                                                           Salesforce login password
  -r, --loginurl=loginurl                                                           Salesforce login URL
  -u, --username=username                                                           Salesforce username
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:auth:soap:login -u myusername -p mypassword
```

_See code: [lib/commands/adp/auth/soap/login.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/auth/soap/login.js)_

## `sfdx adp:config:show [-g] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Displays global and local configuration settings

```
USAGE
  $ sfdx adp:config:show [-g] [-l] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -g, --globalonly                                                                  show global config only
  -l, --localonly                                                                   show local config only
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:config:show
  sfdx adp:config:show -g
  sfdx adp:config:show -l
```

_See code: [lib/commands/adp/config/show.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/config/show.js)_

## `sfdx adp:data:run [-c <string>] [-p <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Runs a job to retrieve from or push data to an org.

```
USAGE
  $ sfdx adp:data:run [-c <string>] [-p <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classname=classname                                                         Java class name of job to run
  -p, --sandboxpassword=sandboxpassword                                             Password for target org if sandbox

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Available Job Types: get, put, delete

EXAMPLES
  sfdx adp:data:run
           // Runs job in interactive mode (easiest)
        
  sfdx adp:data:run -c a1_get_visibility_rules -p mypassword
           // Runs job without user interaction
```

_See code: [lib/commands/adp/data/run.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/data/run.js)_

## `sfdx adp:package:install [-a] [-b Latest|Released] [--noprompt] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx adp:package:install [-a] [-b Latest|Released] [--noprompt] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --allpackages                                                                 All packages, not just dependencies

  -b, --versionbias=(Latest|Released)                                               Type of bias to use when determining
                                                                                    package versions (Latest|Released)

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --noprompt                                                                        disables all prompts

EXAMPLES
  sfdx adp:package:install
  sfdx adp:package:install -u xfrom1
  sfdx adp:package:install -u xfrom1 -l
```

_See code: [lib/commands/adp/package/install.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/install.js)_

## `sfdx adp:package:installed:list [-a] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Compares install package versions with version specified in sfdx-project.json

```
USAGE
  $ sfdx adp:package:installed:list [-a] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --allpackages                                                                 All packages, not just dependencies

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:package:installed:list -u xfrom1
           // Lists the dependencies and the install status of each for the specified target username
```

_See code: [lib/commands/adp/package/installed/list.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/installed/list.js)_

## `sfdx adp:package:list [-a] [-b Latest|Released] [-v] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Lists the current package and all its dependencies

```
USAGE
  $ sfdx adp:package:list [-a] [-b Latest|Released] [-v] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --allpackages                                                                 all packages, not just dependencies

  -b, --versionbias=(Latest|Released)                                               type of bias to use when determining
                                                                                    package versions (Latest|Released)

  -v, --isverbose                                                                   display extended package version
                                                                                    details

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:package:list
           // Lists the current package and all its dependent packages
        
  sfdx adp:package:list -v
           // Lists the packages with extended details, e.g. actual version number, release status and subscriber 
  version ID
        
  sfdx adp:package:list -v -b my_branch
           // Lists the packages belonging to the specified branch
```

_See code: [lib/commands/adp/package/list.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/list.js)_

## `sfdx adp:package:retrieve -p <string> [-q] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retrieves a developer package, converts, and merges it into the local source

```
USAGE
  $ sfdx adp:package:retrieve -p <string> [-q] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --package=package                                                             (required) Package or change set to
                                                                                    retrieve

  -q, --quietmode                                                                   bypasses all user interaction

  -t, --target=target                                                               [default: force-app] Destination
                                                                                    directory for conversion output.
                                                                                    Defaults to force-app.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName
         // pulls the specified package from the org and converts/merges it into force-app
      
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName -t TargetDir
         // pulls a package from the org and converts/merges it into /TargetDir
      
  sfdx adp:package:retrieve -p MyPackage -u OrgUserName -q
         // performs the retrieve-unzip-convert in Quiet mode, i.e without feedback
```

_See code: [lib/commands/adp/package/retrieve.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/retrieve.js)_

## `sfdx adp:package:retrieve:postdestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx adp:package:retrieve:postdestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:package:retrieve:postdestruct
           // Retrieves the "postdestruct" package from the org associated with the default username
        
  sfdx adp:package:retrieve:postdestruct -u myalias
           // Retrieves the "postdestruct" package from the org having username/alias "myalias"
```

_See code: [lib/commands/adp/package/retrieve/postdestruct.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/retrieve/postdestruct.js)_

## `sfdx adp:package:retrieve:predestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Installs the current package and/or its dependencies

```
USAGE
  $ sfdx adp:package:retrieve:predestruct [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:package:retrieve:predestruct
           // Retrieves the "predestruct" package from the org associated with the default username
        
  sfdx adp:package:retrieve:predestruct -u myalias
           // Retrieves the "predestruct" package from the org having username/alias "myalias"
```

_See code: [lib/commands/adp/package/retrieve/predestruct.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/retrieve/predestruct.js)_

## `sfdx adp:package:uninstall [--noprompt] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Uninstalls the current package and/or its dependencies

```
USAGE
  $ sfdx adp:package:uninstall [--noprompt] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --noprompt                                                                        disables all prompts

EXAMPLES
  sfdx adp:package:uninstall
  sfdx adp:package:uninstall -u xfrom1
  sfdx adp:package:uninstall --noprompt
```

_See code: [lib/commands/adp/package/uninstall.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/package/uninstall.js)_

## `sfdx adp:rest:query -q <string> -a <string> -e <string> [-m <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Executes a SOQL query via the Tooling API

```
USAGE
  $ sfdx adp:rest:query -q <string> -a <string> -e <string> [-m <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --accesstoken=accesstoken                                                     (required) OAuth access token with
                                                                                    bang (!) escaped

  -e, --endpoint=endpoint                                                           (required) Salesforce SOAP API
                                                                                    endpoint

  -m, --maxfetch=maxfetch                                                           Max records to fetch

  -q, --query=query                                                                 (required) SOQL query string

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5"
  sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5" -m 100
```

_See code: [lib/commands/adp/rest/query.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/rest/query.js)_

## `sfdx adp:rest:upsert -o <string> -t <string> -x <string> -a <string> -e <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Executes an Upsert via the REST API

```
USAGE
  $ sfdx adp:rest:upsert -o <string> -t <string> -x <string> -a <string> -e <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --accesstoken=accesstoken                                                     (required) OAuth access token with
                                                                                    bang (!) escaped

  -e, --endpoint=endpoint                                                           (required) Salesforce SOAP API
                                                                                    endpoint

  -o, --objectjson=objectjson                                                       (required) JSON array of objects to
                                                                                    upsert

  -t, --objecttype=objecttype                                                       (required) Type of object to upsert

  -x, --externalidfield=externalidfield                                             (required) Name of external id field

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:rest:upsert -t User -o '[{"Ext_Id": "0GQ46000000LA9NGAW", "FirstName": "Xavier"}]' -e https://myinstance.com 
  -a myaccesstoken
```

_See code: [lib/commands/adp/rest/upsert.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/rest/upsert.js)_

## `sfdx adp:shell:run [-f <string>] [-a <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Runs shell script

```
USAGE
  $ sfdx adp:shell:run [-f <string>] [-a <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --args=args                                                                   argument list
  -f, --file=file                                                                   shell script file to run
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

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

_See code: [lib/commands/adp/shell/run.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/shell/run.js)_

## `sfdx adp:shell:runjar -j <string> [--classpath <string>] [-a <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Executes a JAR file with the specified pipe-delimited parameters.

```
USAGE
  $ sfdx adp:shell:runjar -j <string> [--classpath <string>] [-a <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --arguments=arguments                                                         pipe-delimited jar file arguments
  -j, --jarfile=jarfile                                                             (required) path to jar file

  --classpath=classpath                                                             a colon(:)-delimited list of
                                                                                    directories, JAR archives or ZIP
                                                                                    archives to search for class files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

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

_See code: [lib/commands/adp/shell/runjar.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/shell/runjar.js)_

## `sfdx adp:source:deploy [-b] [-c] [--noanonymous] [--nodestructives] [--nomain] [-l <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys the source to a non-tracked org

```
USAGE
  $ sfdx adp:source:deploy [-b] [-c] [--noanonymous] [--nodestructives] [--nomain] [-l <string>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --debugmode                                                                   performs mdapi conversion but skips
                                                                                    deployment

  -c, --checkonly                                                                   validate deploy but don’t save to
                                                                                    the org

  -l, --testlevel=testlevel                                                         [default: RunAllTestsInOrg]
                                                                                    NoTestRun|RunSpecifiedTests|RunLocal
                                                                                    Tests|RunAllTestsInOrg

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --noanonymous                                                                     exclude pre and post anonymous Apex
                                                                                    execution commands (excluded from
                                                                                    override)

  --nodestructives                                                                  exclude pre and post destructive
                                                                                    commands (excluded from override)

  --nomain                                                                          exclude main payload deployment

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

_See code: [lib/commands/adp/source/deploy.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/source/deploy.js)_

## `sfdx adp:source:destruct [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generates a destructiveChanges.xml manifest

```
USAGE
  $ sfdx adp:source:destruct [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:source:destruct -u myscratch
           // Generates a destructiveChanges.xml file for metadata deletions on the tracked org
```

_See code: [lib/commands/adp/source/destruct.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/source/destruct.js)_

## `sfdx adp:source:destructive:prepare -d <string> [-f <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Replaces (*) elements in the destructive package.xml with destructive elements specified by name

```
USAGE
  $ sfdx adp:source:destructive:prepare -d <string> [-f <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --destructsrcdir=destructsrcdir                                               (required) MDAPI-formatted source to
                                                                                    destruct

  -f, --destructivexml=destructivexml                                               Destructive XML file to prepare

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:source:destructive:prepare -f $POST_DESTRUCT_XML -d $CONVERTED_POST_DESTRUCT_DIR
           // Prepares the destructive xml file specifed by -f based on the converted source directory specified after 
  -d.
```

_See code: [lib/commands/adp/source/destructive/prepare.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/source/destructive/prepare.js)_

## `sfdx adp:source:prepare [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Prepares the source for deployment using the pre-deployment transforms configured in plugin-config.json

```
USAGE
  $ sfdx adp:source:prepare [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:source:prepare
           // Transforms the source under force-app as configured in the project plugin-config.json
```

_See code: [lib/commands/adp/source/prepare.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/source/prepare.js)_

## `sfdx adp:tooling:query -q <string> -u <string> -p <string> [-m <number>] [-r <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Executes a SOQL query via the Tooling API

```
USAGE
  $ sfdx adp:tooling:query -q <string> -u <string> -p <string> [-m <number>] [-r <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -m, --maxfetch=maxfetch                                                           Max records to fetch
  -p, --password=password                                                           (required) Salesforce password
  -q, --query=query                                                                 (required) SOQL query string

  -r, --loginurl=loginurl                                                           Use https://test.salesforce.com for
                                                                                    sandbox

  -u, --username=username                                                           (required) Salesforce username

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  sfdx adp:tooling:query -u USERNAME -p PASSWORD -q "SELECT id FROM SandboxInfo"
  sfdx adp:tooling:query -r https://test.salesforce.com -u USERNAME -p PASSWORD -q "SELECT id FROM SandboxInfo" -m 100
```

_See code: [lib/commands/adp/tooling/query.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/tooling/query.js)_

## `sfdx adp:tooling:update -o <string> -t <string> -a <string> -e <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Executes an update via the Tooling API

```
USAGE
  $ sfdx adp:tooling:update -o <string> -t <string> -a <string> -e <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --accesstoken=accesstoken                                                     (required) OAuth access token with
                                                                                    bang (!) escaped

  -e, --endpoint=endpoint                                                           (required) Salesforce SOAP API
                                                                                    endpoint

  -o, --objectjson=objectjson                                                       (required) Object to update

  -t, --objecttype=objecttype                                                       (required) Type of object to update

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx adp:tooling:update -t SandboxInfo -o '{"Id": "0GQ46000000LA9NGAW", "LicenseType": "DEVELOPER", "AutoActivate": 
  true}' -e https://myinstance.com -a myaccesstoken
```

_See code: [lib/commands/adp/tooling/update.js](https://github.com/americanexpress/sfdx-cli-plugin/blob/v0.0.6/lib/commands/adp/tooling/update.js)_
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
