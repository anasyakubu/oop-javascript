class Person {

  constructor(public name: string, public age: number) { }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

}

let Person1 = new Person("anas", 19)

console.log(Person1.getName())
console.log(Person1.getAge())