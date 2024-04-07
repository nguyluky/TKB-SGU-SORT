const {myCustomLevels, logerLever} = require('../configs/logger.config')
const winston = require('winston');
const _ = require('lodash');
const { combine, timestamp, label, printf, colorize } = winston.format;
const { LEVEL, MESSAGE } = require('triple-beam');


const myFormat = printf((arg) => {
    const { level, message , timestamp} = arg;
    // console.log(Object.values(arg))
    return `${timestamp} [${level}]: ${message}`;
});

var myColorize = colorize()
myColorize.transform = (info, opts) => {
    info.level = myColorize.colorize(info[LEVEL], info.level.toUpperCase().padEnd(5))
    return info;
}

var logger = winston.createLogger({
    levels: myCustomLevels.levels,
    level: 0,
    format: combine(
        timestamp(),
        myColorize,
        winston.format.splat(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(),
    ]
})

winston.addColors(myCustomLevels.colors);

module.exports = logger;