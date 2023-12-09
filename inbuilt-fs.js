const fs = require("fs"); // common JS
// import fs from "fs"; // ES Module JS

// create Folder
fs.mkdir("sample-folder", () => {
  console.log("Folder Created Successfullys");
});

if (!fs.existsSync("sample-folder-two")) {
  fs.mkdirSync("sample-folder-two");
}

// fs.readFile("./Details.txt", (err, data) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Data", data);
//   }
// });

// fs.readFile("./Details.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Data", data);
//   }
// });

const data = fs.readFileSync("./Details.txt", "utf8");
console.log("Data", data);

// create a new file
// fs.writeFile(
//   "sample-folder/sample-one.txt",
//   "Hi Hello This is the sample content",
//   () => {
//     console.log("File created successfully");
//   }
// );

fs.writeFileSync(`sample-folder/${new Date().toISOString()}`, `${Date.now()}`);

const count = 4;

// for (let i = 1; i <= count; i++) {
//   fs.writeFileSync(
//     `sample-folder/sample-${i}.txt`,
//     `Hi Hello This is the sample content for sample-${i}`
//   );
// }

fs.appendFile(
  "sample-folder/sample-1.txt",
  "\nContents Getting Appended",
  () => {
    console.log("Content Appended Successfully");
  }
);

fs.unlink("sample-folder/sample-4.txt", () => {
  console.log("Filed Delete Successfully");
});

// read the contents of the folder
const files = fs.readdirSync("sample-folder");
console.log("Files: ", files);
