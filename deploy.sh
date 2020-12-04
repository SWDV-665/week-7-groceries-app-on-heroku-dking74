#!/bin/sh
git subtree push --prefix client https://git.heroku.com/groceries-app-dk.git master || true
git subtree push --prefix server https://git.heroku.com/groceries-server-dk.git  master || true