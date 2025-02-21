import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import genDiff from '../src/index.js';



const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  expect().toEqual('');
  expect().toEqual('');
});

test('second test', () => {
  const text = readFile('file1.json');
  const result = readFile('expectedJson');

  expect(genDiff(text)).toEqual(result);
});

