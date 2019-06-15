const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../dbMethods.js");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash;
    const registeredUser = await db.register(credentials);
    if (registeredUser) {
      res.status(201).json(registeredUser);
    } else {
      res
        .status(400)
        .json({ message: "Please enter a username and password to register." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
