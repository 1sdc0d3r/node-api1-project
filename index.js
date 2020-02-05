const express = require("express");

const db = require("./data/db");

const server = express();
server.use(express.json());

const port = 5000;

server.get("/", (req, res) => {
  res.send({ api: "running test" });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => res.status(200).send(user))
    .catch(err => {
      console.log(`error on GET /users`, err);
      res
        .status(500)
        .send({ errorMessage: "Users information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .send({ errorMessage: "Please provide name and bio for the user." });
  }
  res.status(201).send("User document");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
