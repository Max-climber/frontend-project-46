const buildJson = (AST) => {
    const result = {};
  
    AST.forEach((node) => {
      const { key, type, value, oldValue, newValue, children } = node;
  
      switch (type) {
        case 'nested':
          result[key] = buildJson(children);
          break;
        case 'added':
          result[key] = value;
          break;
        case 'deleted':
          result[key] = null;
          break;
        case 'changed':
          result[key] = newValue;
          break;
        case 'unchanged':
          result[key] = value; 
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  
    return result;
  };
  
  export default (AST) => JSON.stringify(buildJson(AST), null, 2);

