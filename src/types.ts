export type Person = {
  id: 1;
  name: string;
  birthday: Date;
  nickname: string;
};

export const isPerson = (obj: unknown): obj is Person => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const person = obj as Person;
  return (
    typeof person.id === 'number' &&
    typeof person.name === 'string' &&
    person.birthday instanceof Date &&
    typeof person.nickname === 'string'
  );
};
