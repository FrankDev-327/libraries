import { faker } from '@faker-js/faker';
import { Roles } from '../src/enum/role.enum';
import { BookEntity } from '../src/entities/book.entity';

export function generateAdminUserData(override = {}) {
  const now = new Date();
  return {
    id: '3774cdc2-1380-4300-9331-f9d05c1f0c8c',
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: '123456789',
    role: Roles.ADMIN,
    active: true,
    created: now,
    updated: now,
    book: new BookEntity(),
    ...override,
  };
}

export function generateAdminsUsersData(n = 1) {
  return Array.from(
    {
      length: n,
    },
    () => {
      return generateAdminUserData();
    },
  );
}

export function generateUserStatus() {
  return {
    active: false,
  };
}

export function generateAdminUserPayload() {
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: '123456789',
    role: Roles.ADMIN,
    book: new BookEntity(),
  };
}
