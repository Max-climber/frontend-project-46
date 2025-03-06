import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import buildAST from './buildAST.js';
import getFormatter from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parsedData1 = parser(content1, path.extname(filepath1));
  const parsedData2 = parser(content2, path.extname(filepath2));

  
    const AST = buildAST(parsedData1, parsedData2);
    const formatter = getFormatter(format);
    if (!formatter) {
      throw new Error(`Unknown format: ${format}`);
    }
    return `${formatter(AST)}`;
  };