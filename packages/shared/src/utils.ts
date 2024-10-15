// utils.ts
import { Person } from "./person";

export class Utils {
  static greet(person: Person): string {
    return `Hello, ${person.name}!`;
  }

  static calculateAgeInMonths(person: Person): number {
    return person.age * 12;
  }
}
