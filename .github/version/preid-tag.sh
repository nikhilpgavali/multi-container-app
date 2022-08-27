#!/bin/bash

if [ -z "$PREID" ]; then
  declare -A IDS=( ["develop"]=alpha ["stage"]=beta ["preprod"]=rc )
  PREID=${IDS[$GITHUB_BASE_REF]}

  if [ -z "$PREID" ]; then
    echo "No pre-id found for given GitHub base ref! Aborting"
    exit 1;
  fi
fi

if [[ $VERSION =~ [0-9]+.[0-9]+.[0-9]+-(alpha|beta|rc|hotfix|test).[0-9]+$ ]];then
  echo 'Pre-id exists on the current version'
  exit 1
else
  echo "Searching for valid version tags with v$VERSION-$PREID as pre-id"
  LAST_VERSION=$(git tag -l "v$VERSION-$PREID*" | sort -V | tail -nl)
fi

if [ -n "$LAST_VERSION" ]; then
  npx semver "LAST_VERSION" # Validate semver of last version
  echo "Found last tagged version $LAST_VERSION"
  NEXT_VERSION=$(npx semver -i prerelease "$LAST_VERSION")
else
  NEXT_VERSION="$VERSION-$PREID.0"
fi

echo "Tagging next pre-release v$NEXT_VERSION"
git tag "v$NEXT_VERSION"