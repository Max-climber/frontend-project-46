import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff for flat json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expected = readFile('expectedDiffJson.txt').trim();

  expect(genDiff(filePath1, filePath2)).toEqual(expected);
});

test('genDiff for flat yaml', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedDiffYaml.txt').trim();

  expect(genDiff(filePath1, filePath2)).toEqual(expected);
});
