const task2Function = () => {
  let result = "";

  for (let i = 1; i <= 100; i++) {
    switch (true) {
      case i % 3 === 0 && i % 5 === 0 && i % 7 === 0:
        result += "Hello World Yoo, ";
        break;
      case i % 3 === 0 && i % 5 === 0:
        result += "Hello World, ";
        break;
      case i % 3 === 0 && i % 7 === 0:
        result += "Hello Yoo, ";
        break;
      case i % 5 === 0 && i % 7 === 0:
        result += "World Yoo, ";
        break;
      case i % 3 === 0:
        result += "Hello, ";
        break;
      case i % 5 === 0:
        result += "World, ";
        break;
      case i % 7 === 0:
        result += "Yoo, ";
        break;
      default:
        result += i + ", ";
    }
  }

  console.log(result.slice(0, -2)); // Remove the last comma and space
};

task2Function();
