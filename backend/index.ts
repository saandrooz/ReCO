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

// Get all games
app.get("/reco/Games", async (_request: Request, response: Response) => {
  const { rows } = await client.query("SELECT * FROM games");

  response.status(200).send(rows);
});

// Get specific game details
app.get("/reco/Games/:id", async (request: Request, response: Response) => {
  const { rows } = await client.query("SELECT * FROM games WHERE id = $1", [
    request.params.id,
  ]);

  response.status(200).send(rows);
});

// Get game genres
app.get("/reco/Genres/:id", async (request: Request, response: Response) => {
  const gameID = request.params.id;

  const { rows } = await client.query(
    "SELECT * FROM game_genres INNER JOIN genres ON game_genres.genre_id = genres.id WHERE game_id = $1",
    [gameID]
  );

  response.status(200).send(rows);
});

// Get reviews for a specific game and get username of published review
app.get("/reco/Reviews/:id", async (request: Request, response: Response) => {
  const gameID = request.params.id;

  const { rows } = await client.query(
    "SELECT reviews.id, reviews.rating, reviews.review_text, reviews.created, users.username FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.game_id = $1",
    [gameID]
  );

  response.status(200).send(rows);
});

// Post new review for a game
app.post(
  "/reco/NewReview/:id",
  async (request: Request, response: Response) => {
    const gameID = request.params.id;
    const userID = request.body.user_id;
    const rating = request.body.rating;
    const text = request.body.review_text;

    const { rows } = await client.query(
      "INSERT INTO reviews (game_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4)",
      [gameID, userID, rating, text]
    );

    response.status(201).send(rows);
  }
);

// Create/Register account/user
app.post("/reco/Register", async (request: Request, response: Response) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;

  const { rows } = await client.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password]
  );

  response.status(201).send(rows);
});

// Log in user
app.post("/reco/", async (request: Request, response: Response) => {
  const email = request.body.email;
  const password = request.body.password;

  const { rows } = await client.query(
    "SELECT id, username, email, created FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );

  if (rows && rows.length > 0) {
    response.status(200).send(rows[0]);
  } else {
    response.status(401).send(null);
  }
});

// Get user details for profile page
app.get("/reco/Profile/:id", async (request: Request, response: Response) => {
  const { rows } = await client.query(
    "SELECT * FROM users WHERE users.id = $1",
    [request.params.id]
  );

  response.status(200).send(rows);
});

// Get users published reviews for profile page
app.get(
  "/reco/UserReviews/:id",
  async (request: Request, response: Response) => {
    const { rows } = await client.query(
      "SELECT reviews.id, reviews.game_id, reviews.user_id, reviews.rating, reviews.review_text, reviews.created, games.title FROM reviews INNER JOIN games ON reviews.game_id = games.id WHERE reviews.user_id = $1",
      [request.params.id]
    );

    response.status(200).send(rows);
  }
);

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("The web service, ReCo, can now receive requests.");
});
