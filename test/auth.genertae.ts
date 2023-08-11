import { faker } from '@faker-js/faker';

export function generateAuthData(override = {}) {
  return {
    email: faker.internet.email(),
    password: '123456789',
    ...override,
  };
}

export function generateTokenData() {
  return {
    token:
      'eyJzdWIiOiAiMTIzNDU2Nzg5MCIsICJuYW1lIjogIkpvaG4gRG9lIiwgImlhdCI6IDE1MTYyMzkwMjJ9',
  };
}
