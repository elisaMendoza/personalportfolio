#!/bin/sh
set -e

echo "🔄 Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -U postgres; do
  echo "⏳ PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is ready!"

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "✅ Migrations completed!"

echo "🚀 Starting Next.js application..."
exec "$@"
