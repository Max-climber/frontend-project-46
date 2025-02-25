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
  }

  const stringify = (value, depth = 1) => {
    if (!_.isObject(value)) {
      return value;
    }
    const spacesCount = 4;
    const indent = ' '.repeat((depth + 1) * spacesCount - 2)
    const entries = Object
      .entries(value)
      .map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`)
      .join('\n');

    return `{\n${entries}\n${indent}  }`
  }
    
  const stylish = (AST, depth = 1) => {
    const spacesCount = 4;
    const shiftLeft = 2;
    const indent = ' '.repeat(depth * spacesCount - shiftLeft);
    const result = AST
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`;  
        case 'nested':
          return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`
        default: 
          throw new Error(`Unknown type: ${node.type}!`);
    }
    })
    .join('\n');

    return result;
  }

  const genDiff = (obj1, obj2) => {
    const AST = buildAST(obj1, obj2);
    return `{\n${stylish(AST)}\n}`; 
  };
    
  return genDiff(parsedData1, parsedData2);
}
