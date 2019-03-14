// formatting error message
function FormatError(message) {
  this.name = 'Error: ';
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }
}
FormatError.prototype = Object.create(SyntaxError.prototype);
FormatError.prototype.constructor = FormatError;

// check variable type
function isNumeric(num) {
  return !Number.isNaN(num/0);
}

// check if digital is natural
function isNatural(num) {
  return (Number.isInteger(num) && (num >= 0));
}

// get digits sum of number
function getSum(n, m) {
  if (isNumeric(n) && (isNumeric(m) || m === undefined)) {
    // variables type is correct
    const numToStr = (`${n}`).replace('.', '');
    const arr = [...numToStr];
    const mm = (m === undefined) ? arr.length : m;
    const start = (mm > 0) ? (arr.length - m - 1) : -1;
    const end = (mm > 0) ? arr.length : -mm;
    const arrCopy = arr.filter((item, i) => (start < i && i < end));
    return arrCopy.reduce((sum, cur) => +cur + sum, 0);
  }
  // error variables type
  throw new FormatError('error variables type');
}

// get common multiples
function getCommonMultiples(n, m) {
  if (isNumeric(n) && (isNumeric(m) || m === undefined)) {
    // variables type is correct
    const digit2 = (m === undefined) ? n : m;
    if (isNatural(+n) && isNatural(+digit2)) {
      // numbers are correct
      const max = n * digit2;
      const min = (digit2 > n) ? digit2 : n;
      return [...Array(max - min).keys()].filter(i => (i && (i + min) % n === 0 && (i + min) % digit2 === 0)).join(', ');
    }
    // error
    throw new FormatError('numbers may be natural');
  } else {
    // error variables type
    throw new FormatError('error variables type');
  }
}

// check if number is simple
function isPrime(num) {
  return [...Array(num + 1).keys()].filter(el => num % el === 0).length === 2;
}

// check if is integer
function isInteger(num) {
  return num % 1 === 0;
}

// check if number ids Mersenne Number
function isMercenne(num) {
  return isInteger(Math.log2(num + 1));
}

// get all Mercenne
function getMercenne(n) {
  if (isNumeric(+n)) {
    // variables type is correct
    if (isNatural(+n)) {
      if (isPrime(+n)) {
        // error
        throw new FormatError('number may be a prime');
      } else {
        // numbers are correct
        return [...Array(+n).keys()].filter(item => (item && isMercenne(item))).join(', ');
      }
    } else {
      // error
      throw new FormatError('numbers may be natural');
    }
  } else {
    // error variables type
    throw new FormatError('error variables type');
  }
}

// for node.js
module.exports = {
  getSum,
  getCommonMultiples,
  getMercenne,
  isNumeric,
  isNatural,
};
