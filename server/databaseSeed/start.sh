#! /bin/bash

mongoimport --host mongo --db WebShop --collection movies --file /databaseSeedMovies.json
mongoimport --host mongo --db WebShop --collection users --file /databaseSeedUsers.json