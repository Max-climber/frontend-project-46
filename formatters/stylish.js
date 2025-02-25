import stringify from "../src/stringify.js";

 const stylish = (AST, depth = 1) => {
    const spacesCount = 4;
    const shiftLeft = 2;
    const indent = ' '.repeat(depth * spacesCount - shiftLeft);

    const result = AST
      .map((node) => {
        switch (node.type) {
          case 'added':
            return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'deleted':
            return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'unchanged':
            return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
          case 'changed':
            return `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
          case 'nested':
            return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
          default:
            throw new Error(`Unknown type: ${node.type}!`);
        }
      })
      .join('\n');

    return result;
  };

  export default stylish;