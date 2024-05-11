// const fs = require('fs');
// const path = require('path');

// const directoryPath = path.join(__dirname, './');

// // Function to process each file
// function processFile(filePath) {
//   fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     // Check if the import React statement is already there
//     if (!data.startsWith("import React from 'react';")) {
//       // Prepend the import statement to the file content
//       const newData = "import React from 'react';\n" + data;
//       fs.writeFile(filePath, newData, 'utf8', function (err) {
//         if (err) {
//           return console.log(err);
//         }
//         console.log('Updated ' + filePath);
//       });
//     }
//   });
// }

// // Function to recursively read files
// function readFiles(directory) {
//   fs.readdir(directory, { withFileTypes: true }, (err, files) => {
//     if (err) {
//       return console.log('Unable to scan directory: ' + err);
//     }

//     files.forEach((file) => {
//       const filePath = path.join(directory, file.name);
//       if (file.isDirectory()) {
//         readFiles(filePath); // Recurse into subdirectories
//       } else if (file.name.match(/\.jsx$|\.tsx$/)) {
//         processFile(filePath); // Process .jsx and .tsx files
//       }
//     });
//   });
// }

// // Start reading from the base directory
// readFiles(directoryPath);

const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "./");

// Function to process each file
function processFile(filePath) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // Remove the import React statement
    const newData = data.replace(/^import React from 'react';\r?\n/gm, "");
    fs.writeFile(filePath, newData, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Processed " + filePath);
    });
  });
}

// Function to recursively read files
function readFiles(directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file.name);
      if (file.isDirectory()) {
        readFiles(filePath); // Recurse into subdirectories
      } else if (file.name.match(/\.jsx$|\.tsx$/)) {
        processFile(filePath); // Process .jsx and .tsx files
      }
    });
  });
}

// Start reading from the base directory
readFiles(directoryPath);
