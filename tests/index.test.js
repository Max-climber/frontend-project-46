import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff for flat json without format as 3d argument', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expected = readFile('expectedStylish.txt').trim();

  expect(genDiff(filePath1, filePath2)).toEqual(expected);
});

test('genDiff for flat json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expected = readFile('expectedStylish.txt').trim();

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expected);
});

test('genDiff for flat yaml', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedStylish.txt').trim();

  expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(expected);
});

test('genDiff in plain formatt for json', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expected = readFile('expectedPlain.txt').trim();

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expected);
});

test('genDiff in plain formatt for yaml', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedPlain.txt').trim();

  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expected);
});

test('genDiff in json formatt for yaml', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedJson.txt');

  expect(genDiff(filePath1, filePath2, 'json')).toEqual(expected);
});

test('genDiff in json formatt for json', () => {
  const filePath1 = getFixturePath('file1.yml');
  const filePath2 = getFixturePath('file2.yml');
  const expected = readFile('expectedJson.txt');

  expect(genDiff(filePath1, filePath2, 'json')).toEqual(expected);
});
