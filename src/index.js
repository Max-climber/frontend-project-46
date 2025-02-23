import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parsedData1 = parser(content1, path.extname(filepath1));
  const parsedData2 = parser(content2, path.extname(filepath2));

  const genDiff = (obj1, obj2) => {
    
    const iter = (node1, node2, depth, spacesCount) => {
      const keys1 = Object.keys(node1);
      const keys2 = Object.keys(node2);
      const keys = _.sortBy(_.union(keys1, keys2));

      const replacer = ' ';
      const shiftLeft = 2;
      const shift = depth * spacesCount;

      const result = keys.map((key) => {
      
        if( _.isObject(node1[key]) && _.isObject(node2[key]) ) {
          return `${replacer.repeat(shift)}${key}: {\n${iter(node1[key], node2[key], depth + 1, 4)}\n${replacer.repeat(shift)}}`;
        } else {
          if (!Object.hasOwn(node2, key)) {
            return `${replacer.repeat(shift)}- ${key}: ${_.isObject(node1[key]) ? `{${node1[key]}}` : node1[key]}`;
          } if (!Object.hasOwn(node1, key)) {
              return `${replacer.repeat(shift)}+ ${key}: ${_.isObject(node2[key]) ? `{${node2[key]}}` : node2[key]}`;
          } if (node1[key] === node2[key]) {
              return `${replacer.repeat(shift + shiftLeft)}${key}: ${_.isObject(node1[key]) ? `{${node1[key]}}` : node1[key]}`;
          }
          return `${replacer.repeat(shift - shiftLeft)}- ${key}: ${_.isObject(node1[key]) ? `{${node1[key]}}` : node1[key]}\n${replacer.repeat(shift - shiftLeft)}+ ${key}: ${_.isObject(node2[key]) ? `{${node1[key]}}` : node2[key]}`;
        }

      })
      .join('\n');

      return result;
  }
  return `{\n${iter(obj1, obj2, 1, 4)}\n}`;
};

  return genDiff(parsedData1, parsedData2);
};
