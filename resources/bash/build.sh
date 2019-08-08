#!/bin/bash

	USER_NAME=""
	CHECK_ONLY=""
    DEBUG=""
    # Accepted values NoTestRun,RunSpecifiedTests,RunLocalTests,RunAllTestsInOrg
    TEST_LEVEL=""
	CURRENT_DIR=`pwd`

	while [ -n "$1" ] 
	do	 
		case "$1" in

		-u) USER_NAME=" -u $2"
			shift ;;

        -l) TEST_LEVEL=" -l $2"
            shift ;;

		-c) CHECK_ONLY=" -c";;

        -b) DEBUG="$2"
            shift ;;
		 
		--) shift
	 
		break ;;
		 
		esac
		shift
	done

# arg1 (path of flow directoy to check existence)
processFlows() {
    FLOW_PATH=$1    
    if [ -d "$FLOW_PATH" ]; then
        for filename in $FLOW_PATH/*.flow-meta.xml; do
            FLOW_NAME=$(basename "$filename" .flow-meta.xml)
            mv $FLOW_PATH/$FLOW_NAME.flow-meta.xml $FLOW_PATH/$FLOW_NAME-1.flow-meta.xml 
        done
    fi
}
# If there is uncommited/staged changes fail the build
if git diff-index --quiet HEAD --; then

    # If the main temp deploy directory does not exist create it
    if [ ! -d ".epsf/temp/src" ]; then
        mkdir -p .epsf/temp/src
    fi

    # Convert the source
    if [ -d "force-app/main/default" ]; then
        processFlows "force-app/main/default/flows"
        sfdx force:source:convert -r force-app/main/default -d .epsf/temp/src
    else
        echo -e '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n<version>45.0</version>\n</Package>' > .epsf/temp/src/package.xml
    fi

    # Convert the predestruct
    if [ -d "deploy/pre/predestruct/main/default" ]; then
        mkdir -p .epsf/temp/predestruct
        cd deploy/pre/
        # If there are flows to be delted we need to ensure they are both inactive (via flowDefinition active version being set to 0)
        # and by including the version to the end of the actual flow, in our case we always preserve 1 as the active version
        processFlows "predestruct/main/default/flows"
        sfdx force:source:convert -r predestruct/ -d ../../.epsf/temp/predestruct
        mv ../../.epsf/temp/predestruct/package.xml ../../.epsf/temp/src/destructiveChangesPre.xml
        sfdx adp:source:destructive:prepare -d ../../.epsf/temp/predestruct -f ../../.epsf/temp/src/destructiveChangesPre.xml
        cd "$CURRENT_DIR"
    fi

    # Convert the postdestruct
    if [ -d "deploy/post/postdestruct/main/default/" ]; then
        mkdir -p .epsf/temp/postdestruct
        cd deploy/post
        # If there are flows to be delted we need to ensure they are both inactive (via flowDefinition active version being set to 0)
        # and by including the version to the end of the actual flow, in our case we always preserve 1 as the active version
        processFlows "postdestruct/main/default/flows"
        sfdx force:source:convert -r postdestruct/ -d ../../.epsf/temp/postdestruct
        mv ../../.epsf/temp/postdestruct/package.xml ../../.epsf/temp/src/destructiveChangesPost.xml
        sfdx adp:source:destructive:prepare -d ../../.epsf/temp/postdestruct -f ../../.epsf/temp/src/destructiveChangesPost.xml
        cd "$CURRENT_DIR"
    fi

    # Deploy the newly created payload .epsf/temp/src if not in debug mode
    if [ "$DEBUG" != "true" ] && [ "$DEBUG" != "TRUE" ]; then
        sfdx force:mdapi:deploy $TEST_LEVEL -w 60 -d .epsf/temp/src --verbose -g $USER_NAME $CHECK_ONLY
        # rm -r .epsf/temp
    else
        echo "Payload not deployed since DEBUG mode is on."
    fi
    git stash --all
else
    echo "You have uncommitted work, please stash or commit before running this command"
fi