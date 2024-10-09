# Development
Steps for running up the app into development enviroment

1.- Run the database
```
docker compose up -d
```
2.- Clone .env.example as .env
```
cp .env.example .env
```
3.- Set the enviroments variables into the .env file

4.- Request for SEED to have some test data into the DB in [this endpoint](localhost:3000/api/seed)

## Prisma commands
```
  npx prisma init
  npx prisma migrate dev
  npx prisma generate
```