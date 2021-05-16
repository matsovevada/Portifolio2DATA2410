FROM mongo

COPY databaseSeedMovies.json /databaseSeedMovies.json
COPY databaseSeedUsers.json /databaseSeedUsers.json
CMD mongoimport --host mongo --db WebShop --collection movies --file /databaseSeedMovies.json
CMD mongoimport --host mongo --db WebShop --collection users --file /databaseSeedUsers.json