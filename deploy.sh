#!/bin/sh
heroku ps:scale web=1 --app groceries-app-dk
heroku ps:scale api=1 --app groceries-server-dk