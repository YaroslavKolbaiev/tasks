# Task Tracker

Please note env vars are included for the porpuse of this test-task

## Instruction how to start project

1. From project root directory, open terminal and run:
```bash
./init.sh
```

if You get permissions error, run:
```bash
chmod +x init.sh
```

2. After that run:
```bash
docker compose build
```

3. After build is finished, run:
```bash
docker compose up
```

## Instruction how to run tests

1. Make sure containers are running

2. Navigate to backend directory and run:
```bash
npm run test:unit
```
- for unit tests
```bash
npm run test:integration
```
- for integration tests
