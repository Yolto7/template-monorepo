import { Person, Utils } from "@template/shared";

const person: Person = {
  name: "John Doe",
  age: 30,
};

console.log(Utils.greet(person));
