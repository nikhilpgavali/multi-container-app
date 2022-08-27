#!/bin/bash

PROD="prod"
PREPROD="preprod"
STAGE="stage"
DEV="dev"
NONE="none"

if [ -z "$ROOT" ]; then
  ROOT="."
fi
PROJECT=$(jq -r .name "$ROOT/package.json" | cut -d'/' -f2)
echo "PROJECT=$PROJECT" >> "$GITHUB_ENV"
echo "AWS_REGION=us-east-1" >> "$GITHUB_ENV"

DP_ENV="none";
if [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+$ ]]; then
  DP_ENV=$PROD
  PREID="latest"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-rc.[0-9]+$ ]]; then
  DP_ENV=$PREPROD
  PREID="rc"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-hotfix.[0-9]+$ ]]; then
  DP_ENV=$STAGE
  PREID="hotfix"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-beta.[0-9]+$ ]]; then
  DP_ENV=$STAGE
  PREID="beta"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-alpha.[0-9]+$ ]]; then
  DP_ENV=$DEV
  PREID="alpha"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-test.[0-9]+$ ]]; then
  DP_ENV=$DEV
  PREID="test"
fi

if [ -d "src/lambda" ] && [ -d "_templates" ]; then
  echo "Detected serverless repository"
  TYPE="serverless"
  source .github/serverless/set-api-vars.sh 
elif [ -d "src" ]; then
  echo "Detected standard repository"
  TYPE="standard"
elif [ -d "lib" ]; then
  echo "Detected library repository"
  TYPE="lib"
elif [ -f "lerna.json" ]; then
  echo "Detected lerna repository"
  TYPE="lerna"
else
  echo "Unkown repository type"
  exit 1
fi

if [ -z "$VERSION" ]; then
  if [[ $GITHUB_REF =~ refs\/tags\/v ]]; then
    echo "Getting version from semver"
    VERSION=$(npx semver "${GITHUB_REF#"refs/tags/v"}")
  elif [ "$TYPE" == "lerna" ]; then
    echo "Getting version from lerna"
    VERSION=$(jq -r .version lerna.json)
  elif [ -f package.json ]; then
    echo "Getting version from package.json"
    VERSION=$(jq -r .version "$ROOT/package.json")
  else 
    echo "Failed to determine version"
    exit 1
  fi
fi

echo "REPO_TYPE=$TYPE" >> "$GITHUB_ENV";
echo "VERSION=$VERSION" >> "$GITHUB_ENV";
echo "::set-output name=version::$VERSION"
echo "DP_ENV=$DP_ENV" >> "$GITHUB_ENV";
if [ -n "$PREID" ]; then
  echo "PREID=$PREID" >> "$GITHUB_ENV";
fi


# un-comment after confirmation
# if [ "$DP_ENV" != "none" ]; then
#   DOCKER_REGISTRY=491070403555.dkr.ecr.us-east-1.amazonaws.com
#   echo "DOCKER_REGISTRY=$DOCKER_REGISTRY" >> $GITHUB_ENV
#   echo "DOCKER_TAG=$DOCKER_REGISTRY/$PROJECT:$VERSION" >> $GITHUB_ENV
#   echo "ROOT=$ROOT" >> $GITHUB_ENV;
# fi

echo "=============================================="
echo "Project: $PROJECT";
echo "Version: $PROJECT";

if [ "$DP_ENV" != "none" ]; then
 echo "Development envionment: $DP_ENV";
 echo "Deployment pre-id: $PREID";
else 
  echo "No deployment environment set";
fi
echo "=============================================="