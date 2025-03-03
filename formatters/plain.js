import plain from '../src/plain.js';

export default (AST) => {
  const iter = (node, path) => {
    const property = `${path}${node.key}`;

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${plain(node.value)}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${plain(node.oldValue)} to ${plain(node.newValue)}`;
      case 'nested':
        return node.children.map((child) => iter(child, `${property}.`)).filter(Boolean).join('\n');
      default:
        return null;
    }
  };

  return AST
    .flatMap((node) => iter(node, ''))
    .filter(Boolean)
    .join('\n');
};
