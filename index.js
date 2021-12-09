import express from 'express';
import { Router } from 'express';
import * as producerService from './producer.js';

const router = Router();
router.get('/', async (req, res) => res.status(200).send('Yo!'));
router.post('/ingest', async (req, res) => {
  const reqBody = req.body;
  await producerService.dropKafkaMessage(reqBody);
  return res.status(200).json(reqBody);
});

const server = express();
server.use(express.json());
server.use(router);
server.listen(3000, () => {
  console.log('Running on http://localhost:3000');
})