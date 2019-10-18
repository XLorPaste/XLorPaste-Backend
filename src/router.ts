import { Router } from 'express';

import Code, { getToken } from './models'

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
    res.send({
      token: code.token,
      body: code.body,
      lang: code.lang
    });
  } catch (error) {
    res.status(404).send({
      error: error.name
    });
  }
});

export default router;
