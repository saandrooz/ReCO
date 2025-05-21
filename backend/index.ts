import cors from 'cors'
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import path from 'path';

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json());

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get('/api/Games', async (_request: Request, response: Response) => {
  const { rows } = await client.query('SELECT * FROM games')

  response.send(rows)
})


app.get('/api/Games/:id', async (request: Request, response: Response) => {
  const { rows } = await client.query(
      'SELECT * FROM games WHERE id = $1',
      [request.params.id]
    )
  
    response.send(rows)

  // const { rows: games } = await client.query('SELECT * FROM games');
  // const { rows: reviews } = await client.query('SELECT * FROM reviews');

  // response.send({
  //   games,    
  //   reviews,  
  // });
});



app.use(express.static(path.join(path.resolve(), 'dist')))


app.listen(3000, () => {
    console.log('The web service, ReCo, can now receive requests.')
  })
