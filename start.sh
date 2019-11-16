#!/usr/bin/env bash

echo "=== RUNNING DOCKER COMPOSE"
docker-compose up -d

echo "=== MIGRATING DATABASE SCHEMA"
docker-compose exec app sh -c "yarn db:migrate && yarn db:seed:all"

echo "=== ATTACHING TO THE LOGS"
docker-compose logs -f
