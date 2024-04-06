
// Set up logger
// const customColors = {
//     trace: '\x1b[37m',
//     debug: '\x1b[32m',
//     info: '\x1b[32m',
//     warn: '\x1b[33m',
//     crit: '\x1b[31m',
//     fatal: '\x1b[31m'
//   };
  
const myCustomLevels = {
  levels : {
    trace: 0,
    debug: 1,
    info : 2,
    warn : 3,
    error : 4,
    fatal  : 5
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
};

const logerLever = 'trace';

module.exports = {myCustomLevels, logerLever}