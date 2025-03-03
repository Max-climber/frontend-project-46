const buildJson = (AST) => AST.reduce((acc, node) => {
  const {
    key, type, value, newValue, children,
  } = node;

  switch (type) {
    case 'nested':
      return { ...acc, [key]: buildJson(children) };
    case 'added':
      return { ...acc, [key]: value };
    case 'deleted':
      return { ...acc, [key]: null };
    case 'changed':
      return { ...acc, [key]: newValue };
    case 'unchanged':
      return { ...acc, [key]: value };
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}, {});

export default (AST) => JSON.stringify(buildJson(AST), null, 2);
