import stringifyPlain from "../src/stringifyPlain.js";

const plain = (AST) => {

    const iter = (node, path) => {
      const property = `${path}${node.key}`;

      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${stringifyPlain(node.value)}`;
        case 'deleted':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.newValue)}`;
        case 'nested':
          return node.children.map((child) => iter(child, `${property}.`));
        default:
          return null; //тут я не уверен, что хорошее решение, но сделал для того, чтобы .filter(Boolean) отсекал значения типа 'unchanged'
      }
  };

  return AST  
    .flatMap((node) => iter(node, ''))
    .filter(Boolean)                
    .join('\n'); 
};

  export default plain;