const express = require("express");
const db = require("./data/db");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const port = 5000;

server.get("/", (req, res) => {
  res.json({ api: "running test" });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(`error on GET /users`, err);
      res
        .status(500)
        .json({ errorMessage: "Users information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      !user
        ? res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          })
        : res.status(200).json(user);
    })
    .catch(err => {
      console.log("error on GET /users/:id", err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  // console.log(`req: ${req}`);
  db.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => {
      console.log("error on POST /user", error);
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(user =>
      !user
        ? res.status(404).json({
            errorMessage: "The user with the specified ID doesn't exist."
          })
        : res.status(200).json(user)
    )
    .catch(err => {
      console.log("error on DELETE /users/:id", err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "the user with the specified ID doesn't exist"
        });
      } else if (req.body.name.length === 0 || req.body.bio.length === 0) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "user not changed", error: err })
    );
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
