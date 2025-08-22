module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = new Set();
  const closeBrackets = new Map();
  const sameBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    if (open === close) {
      sameBrackets.add(open);
    } else {
      openBrackets.add(open);
      closeBrackets.set(close, open);
    }
  });

  const isValid = Array.from(str).every((char) => {
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openBrackets.has(char)) {
      stack.push(char);
    } else if (closeBrackets.has(char)) {
      if (stack.length === 0 || stack.pop() !== closeBrackets.get(char)) {
        return false;
      }
    }
    return true;
  });

  return isValid && stack.length === 0;
};
