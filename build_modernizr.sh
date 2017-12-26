#!/bin/bash

project_dir="$(cd "$(dirname "$0")"; pwd)"

if [ ! -f "$project_dir/src/modernizr.js" ]; then
    build_folder=`tempfile`
    rm -rf $build_folder
    mkdir "$build_folder"
    pushd "$build_folder"
    git clone https://github.com/Modernizr/Modernizr
    cd Modernizr
    npm install
    ./bin/modernizr -c "$project_dir/modernizr-config-all.json"
    cp ./modernizr.js "$project_dir/src/"
    popd
    rm -rf "$build_folder"
fi
