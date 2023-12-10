import * as bcrypt from 'bcrypt';

export function createEmailRandom() {
  const time = new Date().getTime();
  return time + '@gmail.com';
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
