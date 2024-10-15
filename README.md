# Serverless - AWS Node.js, Typescript, TurboRepo, Middy and MySQL

Serverless Framework with TypeScript with Clean Arquitecture and DDD Architecture.

## Prerequisites

Remember to previously have installed nodejs, serverless-framework, turborepo and mysql.

- [`node.js`](https://nodejs.org)
- [`serverless-framework`](https://github.com/serverless/serverless)
- [`turborepo`](https://turbo.build/)
- [`mysql`](https://sidorares.github.io/node-mysql2/docs)

Run the sql script inside the database folder, so that it creates the database and its corresponding table.

```
CREATE DATABASE recruitment;

CREATE TABLE people (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  height INTEGER NOT NULL,
  mass INTEGER NOT NULL,
  hairColor VARCHAR(50) NOT NULL,
  skinColor VARCHAR(50) NOT NULL,
  eyeColor VARCHAR(50) NOT NULL,
  birthYear VARCHAR(50) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  createdAt datetime NOT NULL,
  createdBy varchar(255) NOT NULL,
  updatedAt datetime DEFAULT NULL,
  updatedBy varchar(255) DEFAULT NULL,
  deletedAt datetime DEFAULT NULL,
  deletedBy varchar(255) DEFAULT NULL,
  deleted tinyint (1) DEFAULT '0'
);

```

## Run the project locally

- step 1: Install all dependencies with the 'npm install' command.
- step 2: Read the README.md file of the people package.
- step 3: Create a debug script (launch.json) with the following code to run the project in debug mode.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Serverless Offline",
      "program": "${workspaceFolder}/packages/people/src/index.ts",
      "outFiles": ["${workspaceFolder}/packages/people/.build/**/*.js"],
      "runtimeExecutable": "${workspaceFolder}/debug.sh",
      "runtimeArgs": ["people"],
      "env": {
        "NODE_ENV": "debug"
      }
    }
  ]
}
```

- step 4: Run the 'npm run build' command to launch the application locally.

The swagger file is located in the path: packages/people/doc

## Deploy the project

You must be in the root of the project and run the following command:

```
./deploy.sh -p people -s dev
```

## Remove the project

You must be in the root of the project and run the following command:

```
./remove.sh -p people -s dev
```

Happy Code 🎸
