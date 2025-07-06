// class Person {

//   constructor(public name: string, public age: number) { }

//   getName(): string {
//     return this.name;
//   }

//   getAge(): number {
//     return this.age;
//   }

// }

// let Person1 = new Person("anas", 19)

// console.log(Person1.getName())
// console.log(Person1.getAge())

import FetchServices1 from "./services/fetchServices";

async function fetchAndLogData() {
  try {
    console.log("Fetching data...");
    const data = await FetchServices1.getData();
    console.log("Data received:", data);
  } catch (error) {
    console.error("Error in fetchAndLogData:", error);
  }
}

fetchAndLogData();
