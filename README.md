# Admin TO - DO's
## Development configuration
Steps for running up the app into development enviroment


1. Run the database (make sure that docker demon is already runing)
```
docker compose up -d
```

2. Clone .env.example as .env and set the enviroments variables into the .env file
```
cp .env.example .env
```

3. Install the dependencies and run the dev server
```
pnpm install

pnpm dev
```
4. Run prisma migrations and generete the schemas
```
npx prisma migrate dev

npx prisma generate
```

5. Request for SEED to have some test data into the DB in [this endpoint](localhost:3000/api/seed)

### Usefull prisma commands
```
  npx prisma init
  npx prisma migrate dev
  npx prisma generate
```