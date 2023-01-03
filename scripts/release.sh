#!/bin/bash

set -e
set -u
set -o posix

version=$1

oldfile=$( mktemp ./old-package.json-XXXXXXXXX )

mv package.json "$oldfile"

trap 'mv "$oldfile" package.json' EXIT

# replace "version" of package.json
jq ".version|=\"$version\"" "$oldfile" > package.json
# create packages that contains the version number
pnpm package
# publish
pnpm exec publib dist-jsii
