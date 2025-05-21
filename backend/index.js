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
app.get('/api/Games', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM games');
    response.send(rows);
}));
app.get('/api/Games/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM games WHERE id = $1', [request.params.id]);
    response.send(rows);
    // const { rows: games } = await client.query('SELECT * FROM games');
    // const { rows: reviews } = await client.query('SELECT * FROM reviews');
    // response.send({
    //   games,    
    //   reviews,  
    // });
}));
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'dist')));
app.listen(3000, () => {
    console.log('The web service, ReCo, can now receive requests.');
});
