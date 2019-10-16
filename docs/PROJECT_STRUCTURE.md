# Project Structure
## /.epsf
Hidden folder containing project-level config and referenced by the tests.  If missing, this folder will be created by the tests.

## /docs
With the exception of README.md, all documentation belongs in this folder.

## /messages
Contains all string messages in the tool.  Not fully implemented yet.

## /resources
Contains resources needed by the plugin, including configuration JSON files.

## /src/helpers
Contains helper modules for additional logic related to specific commands.

## /src/shared
Contains modules for more general logic that could be used across multiple commands or projects.

## /test/resources
Contains resources used by the tests.

## /test/**/*.test.ts
Fast-running unit tests that don't call other commands and test a single module.

## /test/**/*.integ.ts
Slower-running integration tests that might span multiple modules.
