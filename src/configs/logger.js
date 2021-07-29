/**
 * @author Dudi Iskandar
 * @title Logger Configuration
 * @date July 29, 2021 19:20
 */

const winston = require('winston');
const DailyRotate = require('winston-daily-rotate-file');

const util = require('../core/utility');
const config = require('./config');

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({ level, message }) => `[${util.now_timestamp().split(' ')[1]}]: ${message}`)
);

const getDailyRotate = (_filename) => (
    new DailyRotate({
        filename: _filename,
        datePattern: 'DD-MMM-YYYY',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        json: false, //Setting JSON as false,
        format: logFormat
    })
);

const infoLogger = winston.createLogger({
    level: 'info',
    transports: [
        getDailyRotate(config.LOG_DIR + '/info/%DATE%.log')
    ]
});

const errorLogger = winston.createLogger({
    level: 'error',
    transports: [
        getDailyRotate(config.LOG_DIR + '/error/%DATE%.log')
    ]
});

const generateWarningLog = winston.createLogger({
    level: 'warning',
    transports: [
        getDailyRotate(config.LOG_DIR + '/warning/%DATE%.log')
    ]
});

const generateDebugLog = winston.createLogger({
    level: 'debug',
    transports: [
        getDailyRotate(config.LOG_DIR + '/debug/%DATE%.log')
    ]
});

module.exports = {
    info: (message, data = {}) => {
        console.log('\x1b[32m%s\x1b[0m', `INFO : ${message}`)
        const m = {
            message: message,
            data: data
        }
        return infoLogger.info(JSON.stringify(m))
    },
    error: (message, data = {}) => {
        console.log('\x1b[31m%s\x1b[0m', `ERROR : ${message}`)
        const m = {
            message: message,
            data: data
        }
        return errorLogger.error(JSON.stringify(m))
    },
    warning: (message, data = {}) => {
        console.log('\x1b[33m%s\x1b[0m', `WARNING : ${message}`)
        const m = {
            message: message,
            data: data
        }
        return generateWarningLog.warning(JSON.stringify(m))
    },
    debug: (message, data = {}) => {
        console.log('\x1b[34m%s\x1b[0m', `DEBUG : ${message}`)
        const m = {
            message: message,
            data: data
        }
        return generateDebugLog.debug(JSON.stringify(m))
    }
}
