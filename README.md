## Overview

This project sends reminder messages on individuals’ birthdays. Its main logic is in index.ts, which checks for birthdays and sends LINE notifications via `LINE message API`.
In `crontab` file, the script is scheduled to execute every day at 8:30 AM when running in a Docker container. You can adjust the schedule as needed.

## Database

Before getting started, make sure you have a proper database set up.

- Entity-Relationship Diagram (ERD)

![ERD](https://i.imgur.com/kasvJaT.png)

- Database sql example

```sql
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  birthday DATE
);

CREATE TABLE group_category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE person_group (
    person_id INT REFERENCES person(id) ON DELETE CASCADE,
    group_id INT REFERENCES group_category(id) ON DELETE CASCADE,
    PRIMARY KEY (person_id, group_id)
);
```

## Installation

Clone this repository and install dependencies:

```sh
npm install
```

## Configuration

Create a new `.env` file by copying `.env.example` and setting the required environment variables, especially the database connection string and LINE settings.

## Usage - Local Development

Build the project, then start it:

```sh
npm run build
npm start
```

## Usage - Docker

To run the project in a Docker container, ensure you have Docker & Docker Compose installed. Then, run the following command:

```sh
docker-compose up -d
```
