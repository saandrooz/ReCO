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

  const { rows } = await client.query("SELECT * FROM game_genres WHERE game_id = $1", [
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


app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(3000, () => {
  console.log("The web service, ReCo, can now receive requests.");
});
