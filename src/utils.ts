import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

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
  const logFileDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(logFileDir)) {
    fs.mkdirSync(logFileDir, { recursive: true });
  }
  const logFilePath = path.join(logFileDir, 'log.txt');

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
