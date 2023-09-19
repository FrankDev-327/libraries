#!/bin/bash

# Custom entrypoint script to run init.sql
set -e

# Start PostgreSQL
/usr/local/bin/docker-entrypoint.sh postgres &
PID=$!

# Wait for PostgreSQL to start
until psql -U $POSTGRES_USER -d $POSTGRES_DB -h localhost -p 5432 -c '\l'; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

# Run the init.sql file
psql -U $POSTGRES_USER -d $POSTGRES_DB -h localhost -p 5432 -a -f /docker-entrypoint-initdb.d/init.sql

# Wait PostgreSQL
wait $PID

# Stop PostgreSQL
kill -TERM $PID

# Allow the entrypoint to complete
wait