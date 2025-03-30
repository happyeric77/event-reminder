import dotenv from 'dotenv';
dotenv.config();

export type Person = {
  name: string;
  nickname: string;
  birthday: Date;
  group: string;
};

export const isPerson = (obj: unknown): obj is Person => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const person = obj as Person;
  return (
    typeof person.name === 'string' &&
    typeof person.nickname === 'string' &&
    person.birthday instanceof Date &&
    typeof person.group === 'string'
  );
};
