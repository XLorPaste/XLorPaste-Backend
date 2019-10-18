import { Schema, model, Document } from 'mongoose';

import { LANG } from './config';
import { randomString } from './util';

export type CodeDocument = Document & {
  token: string;
  body: LANG;
  lang: string;
};

const CodeSchema = new Schema({
  token: {
    type: String,
  },
  body: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    default: LANG.text,
    validate: (v: string) => {
      return v in LANG;
    }
  }
});

const Code = model<CodeDocument>('Code', CodeSchema);

export default Code;

export async function getToken() {
  let token = randomString();
  while (await Code.findOne({ token })) {
    token = randomString();
  }
  return token;
}
