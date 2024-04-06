
const {myCustomLevels, logerLever} = require('../configs/logger.config')
const winston = require('winston');
const _ = require('lodash');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf((arg) => {
    const { level, message , timestamp} = arg;
    // console.log(Object.values(arg))
    return `${timestamp} [${level}]: ${message}`;
});

var logger = winston.createLogger({
    levels: myCustomLevels.levels,
    level: 0,
    format: combine(
        timestamp(),
        winston.format.colorize(),
        winston.format.splat(),
        myFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
})

winston.addColors(myCustomLevels.colors);

module.exports = logger;