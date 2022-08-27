#!/bin/bash

if [ -z "$REPO_TYPE" -o -z "$TARGET" ]; then
  echo "Repo type or target version are not defined. Exiting,";
  exit 1;
elif [ "$REPO_TYPE" == "learn" ]; then
  if [ "$PUBLISH" == "true" ]; then
    git checkout -b publish
  fi
  npx lerna version --no-git-tag-version --yes --exact "$TARGET"
else
  npm version -- no-git-tag-version "$TARGET"
fi     
