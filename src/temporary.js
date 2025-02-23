const stringify = (data, replacer = ' ', spacesCount = 1) => {
    if (_.isObject(data)) {
  
      const iter = (value, depth = 1) => {
        const changedStr = Object.keys(value)
          .map((key) => {
            if (!_.isObject(value[key])) { 
              return `${replacer.repeat(depth * spacesCount)}${key}: ${value[key]}\n`;
            } else {
              return `${replacer.repeat(depth * spacesCount)}${key}: {\n${iter(value[key], depth + 1)}${replacer.repeat(depth * spacesCount)}}\n`;
            }
          })
          .join(''); 
        return `${changedStr}`;
      };
  
      return `{\n${iter(data)}}`;
    }
  };