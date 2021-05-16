FROM mongo

COPY databaseSeed.json /databaseSeed.json
COPY databaseSeedUsers.json /databaseSeedUsers.json
CMD mongoimport --host mongo --db WebShop --collection movies --file /databaseSeed.json
CMD mongoimport --host mongo --db WebShop --collection users --file /databaseSeedUsers.json