const fs = require("fs");

async function createFile(data, path = "./pages.json") {
  // write file to disk
  fs.writeFile(path, data, "utf8", (err) => {
    if (err) {
      throw Error(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully! to ${path}`);
    }
  });
}

let date = new Date()
createFile(JSON.stringify({date: date.toGMTString()}), "date.json")