// Generates fake checkout test data (name, postcode) via @faker-js/faker.
import { faker } from '@faker-js/faker';

export interface UserInfo {
  firstName: string;
  lastName: string;
  postcode: string;
}

export function userInfo(): UserInfo {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postcode: faker.location.zipCode(),
  };
}
