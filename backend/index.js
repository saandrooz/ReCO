"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
// Get All Games
app.get("/reco/Games", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT * FROM games");
    response.send(rows);
}));
// Get Specific Game Details 
app.get("/reco/Games/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT * FROM games WHERE id = $1", [
        request.params.id,
    ]);
    response.send(rows);
}));
// Get Game Genres
app.get("/reco/Genres/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = request.params.id;
    const { rows } = yield client.query("SELECT * FROM game_genres INNER JOIN genres ON game_genres.genre_id = genres.id WHERE game_id = $1", [
        gameID
    ]);
    response.send(rows);
}));
// Create/Post Account/User
app.post("/reco/Register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const { rows } = yield client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password]);
    response.send(rows);
}));
// Log In User
app.post("/reco/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.body.email;
    const password = request.body.password;
    const { rows } = yield client.query("SELECT id, username, email, created FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (rows && rows.length > 0) {
        response.send(rows[0]);
    }
    else {
        response.status(401).send(null);
    }
}));
// User Profile 
app.get("/reco/Profile/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query("SELECT * FROM users WHERE users.id = $1", [request.params.id]);
    response.send(rows);
}));
// Get Reviews For Specific Game
app.get("/reco/Reviews/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = request.params.id;
    const { rows } = yield client.query("SELECT * FROM reviews INNER JOIN games ON reviews.game_id = games.id WHERE game_id = $1", [
        gameID
    ]);
    response.send(rows);
}));
// Get Username Of A Published Review For A Specific Game
// OBS: NEEDS WORK
app.get("/reco/Reviews/:userID", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = request.params.userID;
    const { rows } = yield client.query("SELECT * FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE user_id = $1", [
        userID
    ]);
    response.send(rows);
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
app.listen(3000, () => {
    console.log("The web service, ReCo, can now receive requests.");
});
