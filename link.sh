#!/usr/bin/env bash

yarn unlink ngx-breadcrumbs

cd build/ngx-breadcrumbs
yarn unlink
yarn link
cd ../..

yarn link ngx-breadcrumbs


