FROM mongo

COPY databaseSeedMovies.json /databaseSeedMovies.json
COPY databaseSeedUsers.json /databaseSeedUsers.json

ADD start.sh /
RUN chmod +x /start.sh
RUN sed -i -e 's/\r$//' start.sh
CMD ["/start.sh"]