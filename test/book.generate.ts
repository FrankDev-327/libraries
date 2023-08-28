import { faker } from '@faker-js/faker';
import { Roles } from '../src/enum/role.enum';

export function generateBookData(override = {}) {
  const now = new Date();
  return {
    id: '3774cdc2-1380-4300-9331-f9d05c1f0c8c',
    title: faker.person.jobTitle(),
    description: faker.commerce.productDescription(),
    publisher: faker.commerce.productName(),
    created: now,
    updated: now,
    ...override,
  };
}

export function generateBooksData(n = 1) {
  return Array.from(
    {
      length: n,
    },
    () => {
      return generateBookData();
    },
  );
}

export function generateCurrentUser() {
  return {
    id: '3774cdc2-1380-4300-9331-f9d05c1f0c8c',
    role: Roles.AUTHOR,
  };
}

export function generateBookPayload() {
  return {
    title: faker.person.jobTitle(),
    description: faker.commerce.productDescription(),
    publisher: faker.commerce.productName(),
  };
}

export function generateBookCreatePayload() {
  return {
    userId: 'bb0bd4a7-d05d-4fcb-a857-d3ef8aaed771',
    title: faker.person.jobTitle(),
    description: faker.commerce.productDescription(),
    publisher: faker.commerce.productName(),
  };
}
