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
// Get all games
app.get('/reco/Games', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM games');
    response.status(200).send(rows);
}));
// Get specific game details
app.get('/reco/Games/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM games WHERE id = $1', [
        request.params.id,
    ]);
    response.status(200).send(rows);
}));
// Get game genres
app.get('/reco/Genres/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = request.params.id;
    const { rows } = yield client.query('SELECT * FROM game_genres INNER JOIN genres ON game_genres.genre_id = genres.id WHERE game_id = $1', [gameID]);
    response.status(200).send(rows);
}));
// Get reviews for a specific game and get username of published review
app.get('/reco/Reviews/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = request.params.id;
    const { rows } = yield client.query('SELECT reviews.id, reviews.rating, reviews.review_text, reviews.created, users.username FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.game_id = $1', [gameID]);
    response.status(200).send(rows);
}));
// Post new review for a game
app.post('/reco/NewReview/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameID = request.params.id;
    const userID = request.body.user_id;
    const rating = request.body.rating;
    const text = request.body.review_text;
    const { rows } = yield client.query('INSERT INTO reviews (game_id, user_id, rating, review_text) VALUES ($1, $2, $3, $4)', [gameID, userID, rating, text]);
    response.status(201).send(rows);
}));
// Create/Register account/user
app.post('/reco/Register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const { rows } = yield client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
    response.status(201).send(rows);
}));
// Log in user
app.post('/reco/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.body.email;
    const password = request.body.password;
    const { rows } = yield client.query('SELECT id, username, email, created FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (rows && rows.length > 0) {
        response.status(200).send(rows[0]);
    }
    else {
        response.status(401).send(null);
    }
}));
// Get user details for profile page
app.get('/reco/Profile/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM users WHERE users.id = $1', [request.params.id]);
    response.status(200).send(rows);
}));
// Get users published reviews for profile page
app.get('/reco/UserReviews/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT reviews.id, reviews.game_id, reviews.user_id, reviews.rating, reviews.review_text, reviews.created, games.title FROM reviews INNER JOIN games ON reviews.game_id = games.id WHERE reviews.user_id = $1', [request.params.id]);
    response.status(200).send(rows);
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'dist')));
app.listen(3000, () => {
    console.log('The web service, ReCo, can now receive requests.');
});
