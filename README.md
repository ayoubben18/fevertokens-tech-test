# Task 1

This is a challenge made by Ayoub Bensalah for FeverTokens :)
It's using the latest version of Next.js with TypeScript and ShadcnUI

## You can find a live version of the app here:

https://fevertokens-tech-test-rho.vercel.app/

Otherwise if ou want to check for yourself read below :

## Getting Started

- run in the cli: pnpm install
- then run ( pnpm run build ) to build a production ready version for the project
- run ( pnpm run start --port=8000 ) to see the version of the production ready version

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

# Task 2

code:

const task2Function = () => {
let output = "";

for (let i = 1; i <= 100; i++) {
switch (true) {
case i % 3 === 0 && i % 5 === 0 && i % 7 === 0:
output += "Hello World Yoo, ";
break;
case i % 3 === 0 && i % 5 === 0:
output += "Hello World, ";
break;
case i % 3 === 0 && i % 7 === 0:
output += "Hello Yoo, ";
break;
case i % 5 === 0 && i % 7 === 0:
output += "World Yoo, ";
break;
case i % 3 === 0:
output += "Hello, ";
break;
case i % 5 === 0:
output += "World, ";
break;
case i % 7 === 0:
output += "Yoo, ";
break;
default:
output += i + ", ";
}
}

console.log(output.slice(0, -2)); // Remove the last comma and space
};

task2Function();

output:
1, 2, Hello, 4, World, Hello, Yoo, 8, Hello, World, 11, Hello, 13, Yoo, Hello World, 16, 17, Hello, 19, World, Hello Yoo, 22, 23, Hello, World, 26, Hello, Yoo, 29, Hello World, 31, 32, Hello, 34, World Yoo, Hello, 37, 38, Hello, World, 41, Hello Yoo, 43, 44, Hello World, 46, 47, Hello, Yoo, World, Hello, 52, 53, Hello, World, Yoo, Hello, 58, 59, Hello World, 61, 62, Hello Yoo, 64, World, Hello, 67, 68, Hello, World Yoo, 71, Hello, 73, 74, Hello World, 76, Yoo, Hello, 79, World, Hello, 82, 83, Hello Yoo, World, 86, Hello, 88, 89, Hello World, Yoo, 92, Hello, 94, World, Hello, 97, Yoo, Hello, World

# Task 3

Personally I will follow the zigzag method to find my friend,
meaning I will drive for a distance D in one direction, then I will retun to my starting point and drive in the opposite direction for the same distance D, then I will return to my starting point, then I'll repeat the same method but this time I will drive the double of the distance 2D.
Repeating this will ensure me that I will cover more ground at each iteration till I find my friend.
