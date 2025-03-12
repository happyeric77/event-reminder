import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

export const getMonth = (date: Date) => {
  const month = date.getMonth();
  const monthDays = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthDays[month];
};

export const notify = async (text: string): Promise<Response> => {
  const url = 'https://api.line.me/v2/bot/message/push';
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const targetId = process.env.LINE_USER_OR_GROUP_ID;
  const payload = {
    to: targetId,
    messages: [
      {
        type: 'text',
        text,
      },
    ],
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${channelSecret}`,
    },
    body: JSON.stringify(payload),
  });

  return res;
};

export const printLog = (msg: string, type: 'error' | 'info'): void => {
  const message = `[${new Date().toLocaleString()}] ${msg}`;
  const logFilePath = path.join(__dirname, '..', 'assets', 'logs.txt');
  fs.appendFileSync(logFilePath, message + '\n', 'utf8');
  switch (type) {
    case 'error':
      console.error(message);
      break;
    case 'info':
      console.info(message);
      break;
    default:
      console.log(message);
      break;
  }
};
