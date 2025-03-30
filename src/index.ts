import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
// import { notify, printLog } from './utils';

import { printLog } from './utils';
import path from 'path';
import { isPerson } from './models';
dotenv.config();

const logFilePath = path.join(__dirname, '..', 'assets', 'logs.txt');
const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(process.env.DATABASE_URL);
  const today = new Date();
  if (today.getHours() !== 8) {
    return console.info('現在の時刻は8時ではありません');
  }
  const thisMonth = today.getMonth() + 1;
  const thisDay = today.getDate();

  try {
    const result = await sql`
      SELECT 
        public.person.name as name,
        public.person.nickname,
        public.group_category.name as group,
        public.person.birthday
      FROM public.person 
      JOIN public.person_group ON public.person_group.person_id = public.person.id
      JOIN public.group_category ON public.group_category.id = public.person_group.group_id
      WHERE public.person_group.group_id = 1
        AND EXTRACT(MONTH FROM birthday) = ${thisMonth} AND EXTRACT(DAY FROM birthday) = ${thisDay};
    `;

    const persons = result.filter(isPerson);

    if (persons.length === 0) {
      return printLog('今日誕生日の人はいません', 'info', logFilePath);
    }

    const nicknames = persons
      .filter(isPerson)
      .map((person) => person.nickname)
      .join('、');

    const message = `今日(${thisMonth}/${thisDay}) は ${nicknames} の誕生日です✨ ！！ おめでとうー！ `;
    // notify(message);
  } catch (error) {
    if (error instanceof Error) {
      return printLog(`ERROR: ${error.message}`, 'error', logFilePath);
    }
    printLog(`ERROR: Unknown `, 'error', logFilePath);
  }
};

const run = async (thread: () => Promise<void>, repeatInMinutes: number) => {
  while (true) {
    try {
      await thread();
    } catch (e) {
      printLog(`Unknown Error: ${e}`, 'error', logFilePath);
    }
    console.info(`Waiting for ${repeatInMinutes} minutes...`);
    await new Promise((resolve) =>
      setTimeout(resolve, repeatInMinutes * 60 * 1000),
    );
  }
};

// run(async () => main(), 30);

main();
