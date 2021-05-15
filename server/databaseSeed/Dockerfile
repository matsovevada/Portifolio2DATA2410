FROM mongo

COPY databaseSeed.json /databaseSeed.json
CMD mongoimport --host mongo --db WebShop --collection movies --file /databaseSeed.json