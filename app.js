const router = require("./routes");
const fs = require("fs");
const xss = require("xss");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const dompurify = require("dompurify");
dotenv.config();
const port = process.env.PORT || 4000;
app.use(express.json());

const { getData, writeData } = require("./common/readAndWrite");

app.use("/routes", router);

app.post("/users", (req, res) => {
  // const users = [
  //   { id: 1, name: '<script>alert("XSS")</script>' },
  //   { id: 2, name: "John Doe" },
  //   { id: 3, name: '<img src="https://example.com/malicious.jpg">' },
  // ];

  Object.keys(req.body).forEach((key) => {
    req.body[key] = xss(req.body[key]);
  });

  //   const userInput = req.body.userInput;
  //   const safeInput = dompurify.sanitize(req.body.userInput);
  //   console.log("(req.body.userInput)", req.body.userInput);
  //   xss(req.body);

  //   console.log("safeInput", safeInput);

  res.send(req.body);
});

app.get("/*", async (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => console.log("listening to the port", port));
