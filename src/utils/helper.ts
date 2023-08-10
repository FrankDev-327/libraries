import * as bcrypt from 'bcrypt';

export const hashing = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const comparing = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
