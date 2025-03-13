## Overview

This project sends reminder messages on individuals’ birthdays. Its main logic is in index.ts, which checks for birthdays each day at 8AM and sends notifications via the `notify` function.

## Installation

Clone this repository and install dependencies:

```sh
npm install
```

## Configuration

Create a new .env file by copying .env.example and setting the required environment variables, especially the database connection string and LINE settings.

## Usage

Build the project, then start it:

```sh
npm run build
npm start
```

To run within Docker, use the Dockerfile and docker-compose.yml.

## Database format

```sql
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  birthday DATE
);
```
