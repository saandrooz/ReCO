import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// Get All Games
app.get("/reco/Games", async (_request: Request, response: Response) => {
  const { rows } = await client.query("SELECT * FROM games");

  response.send(rows);
});

// Get Specific Game Details 
app.get("/reco/Games/:id", async (request: Request, response: Response) => {
  const { rows } = await client.query("SELECT * FROM games WHERE id = $1", [
    request.params.id,
  ]);

  response.send(rows);
});

// Get Game Genres
app.get("/reco/Genres/:id", async (request: Request, response: Response) => {
  const gameID = request.params.id

  const { rows } = await client.query("SELECT * FROM game_genres INNER JOIN genres ON game_genres.genre_id = genres.id WHERE game_id = $1", [
    gameID
  ]);

  response.send(rows);
});

// Create/Post Account/User
app.post("/reco/Register", async (request: Request, response: Response) => {
  const username = request.body.username 
  const email = request.body.email
  const password = request.body.password

  const { rows } = await client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password]
  );

  response.send(rows);
});


// Log In User
app.post("/reco/", async (request: Request, response: Response) => {
  const email = request.body.email
  const password = request.body.password

  const { rows } = await client.query("SELECT id, username, email, created FROM users WHERE email = $1 AND password = $2", [email, password]);

  if (rows && rows.length > 0) {
    response.send(rows[0]);
  } else {
    response.status(401).send(null)
  }

});

// User Profile 
app.get("/reco/Profile/:id", async (request: Request, response: Response) => {
  const { rows } = await client.query("SELECT * FROM users WHERE users.id = $1", [request.params.id]);

  response.send(rows);
});

// Get Reviews For Specific Game
app.get("/reco/Reviews/:id", async (request: Request, response: Response) => {
  const gameID = request.params.id

  const { rows } = await client.query("SELECT * FROM reviews INNER JOIN games ON reviews.game_id = games.id WHERE game_id = $1", [
    gameID
  ]);

  response.send(rows);
});

// Get Username Of A Published Review For A Specific Game
// OBS: NEEDS WORK
app.get("/reco/Reviews/:userID", async (request: Request, response: Response) => {
  const userID = request.params.userID

  const { rows } = await client.query("SELECT * FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE user_id = $1", [
    userID
  ]);

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("The web service, ReCo, can now receive requests.");
});
