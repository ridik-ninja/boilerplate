const fs = require("fs");
const getData = (fileName) => {
  return fs.promises.readFile(`./${fileName}.txt`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const writeData = (fileName, fileContent) => {
  fs.promises.writeFile(`./${fileName}.txt`, fileContent, (err) => {
    console.log(err);
  });
};

module.exports = { getData, writeData };
