import http from 'http';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { notify, printLog } from './utils';
import { isPerson, Person } from './types';
dotenv.config();

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  const sql = neon(process.env.DATABASE_URL);
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const thisDay = today.getDate();
  // const thisMonth = 10;
  // const thisDay = 3;
  try {
    const persons =
      await sql`SELECT * FROM person WHERE EXTRACT(MONTH FROM birthday) = ${thisMonth} AND EXTRACT(DAY FROM birthday) = ${thisDay};`;

    if (persons.length === 0) {
      return printLog('今日誕生日の人はいません', 'info');
    }

    const nicknames = persons
      .filter(isPerson)
      .map((person) => person.nickname)
      .join('、');
    const message = `今日(${thisMonth}/${thisDay}) は ${nicknames} の誕生日です✨ ！！ おめでとうー！ `;
    notify(message);
  } catch (error) {
    if (error instanceof Error) {
      return printLog(`ERROR: ${error.message}`, 'error');
    }
    printLog(`ERROR: Unknown `, 'error');
  }
};

main();
