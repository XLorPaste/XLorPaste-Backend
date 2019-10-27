import { Router } from 'express';

import Code, { getToken } from './models';
import { b64decode } from './util';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, this is XLorPaste');
});

router.post('/', async (req, res) => {
  try {
    const code = new Code(req.body);
    code.token = await getToken();
    await code.save();
    res.send({
      token: code.token
    });
  } catch (error) {
    res.status(500).send({
      error: error.name
    });
  }
});

router.get('/:token', async (req, res) => {
  try {
    const code = await Code.findOne({
      token: req.params.token
    });
    if ('raw' in req.query) {
      res.setHeader('Content-Type', 'text/plain');
      res.send(b64decode(code.body));
    } else {
      res.send({
        token: code.token,
        body: code.body,
        lang: code.lang
      });
    }
  } catch (err) {
    res.status(404).send({
      error: err.name
    });
  }
});

export default router;
