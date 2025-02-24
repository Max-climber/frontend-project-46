import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parsedData1 = parser(content1, path.extname(filepath1));
  const parsedData2 = parser(content2, path.extname(filepath2));

  const buildAST = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.sortBy(_.union(keys1, keys2));

    return keys.map((key) => {
      if( !Object.hasOwn(obj2, key) ) {
        return {type: 'deleted', key, value: obj1[key]};
      } 

      if( !Object.hasOwn(obj1, key) ) {
        return {type: 'added', key, value: obj2[key]};
      } 

      if( _.isObject(obj1[key]) && _.isObject(obj2[key]) ) {
        return {type: 'nested', key, children: buildAST(obj1[key], obj2[key])}
      }

      if ( obj1[key] === obj2[key]) {
          return {type: 'unchanged', key, value: obj1[key]};
      } 

      return {type: 'changed', key, oldValue: obj1[key], newValue: obj2[key]};
    })
    const stringify = (node1, node2, depth, spacesCount) => {
        
  
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
    return `{\n${stringify(obj1, obj2, 1, 4)}\n}`;
  };
  

  const genDiff = (obj1, obj2) => {
    const AST = buildAST(obj1, obj2);
    return `{\n${stylish(AST)}\n}`;
    };

return genDiff(parsedData1, parsedData2);
}