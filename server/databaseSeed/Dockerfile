FROM mongo

COPY databaseSeedMovies.json /databaseSeedMovies.json
COPY databaseSeedUsers.json /databaseSeedUsers.json

ADD start.sh /
RUN chmod +x /start.sh
CMD ["/start.sh"]