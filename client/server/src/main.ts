/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { type Response, type Request } from 'express';
import { BiliService } from './bili';
import { type OriginService } from './interface';
import { successResp, validateOrigin } from './utils';
import axios from 'axios';
import 'express-async-errors';

const app = express();
const PORT = 9799;

app.use(express.json());

const service: Record<string, OriginService> = {
  bili: new BiliService(),
};

app.get('/api/config/:origin', async (req: Request, res: Response) => {
  const origin = req.params.origin;
  if (!validateOrigin(origin)) {
    res.status(400).send('Invalid origin');
    return;
  }
  const data = await service[origin].getConfig();
  res.send(successResp(data));
});

app.get('/api/search/:origin', async (req: Request, res: Response) => {
  const origin = req.params.origin;
  const keyword = req.query.keyword as string;
  const page = (req.query.page || '1') as string;

  if (!validateOrigin(origin)) {
    res.status(400).send('Invalid origin');
    return;
  }
  const data = await service[origin].search({
    keyword,
    page,
  });
  res.send(successResp(data));
});

app.get('/api/search/:origin/:id', async (req: Request, res: Response) => {
  const origin = req.params.origin;
  const id = req.params.id;

  if (!validateOrigin(origin)) {
    res.status(400).send('Invalid origin');
    return;
  }
  const data = await service[origin].searchDetail(id);
  res.send(successResp(data));
});

app.get('/api/music/file/:origin/:id', async (req: Request, res: Response) => {
  const origin = req.params.origin;
  const id = req.params.id;

  if (!validateOrigin(origin)) {
    res.status(400).send('Invalid origin');
    return;
  }
  // 缓存时间为 10 年
  res.setHeader('Cache-control', `max-age=${1 * 60 * 60 * 24 * 365 * 10}`);
  service[origin].getMusicFile(id, res);
});

app.get('/api/open-music-order', async (req: Request, res: Response) => {
  const origin = req.query.origin as string;
  const r = await axios.get<any>(origin);
  res.send(successResp(r.data));
});

app.use(express.static('./fe'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
