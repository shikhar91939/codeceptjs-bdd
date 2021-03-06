const merge = require('deepmerge');
const master_conf = require('./master/codecept.master.conf').master_conf;
const logger = require('../logger/logger');
const driversConf = require('./drivers/drivers.conf');
const gDriver = process.env.DRIVER;

logger.welcome();

/**
 * Create Configure with Master config
 *
 * @param {object} conf
 */
const create = (conf) => {
    const driver =
        master_conf.helpers[
            Object.keys(master_conf.helpers).find(
                (driver) => driver.toLowerCase() === gDriver.toLowerCase()
            )
        ];

    if (!driver) {
        logger.error(
            `'${gDriver}' is not a supported driver. Supported drivers are: [${Object.keys(
                driversConf
            )}]`
        );
    }

    const browser = driver.browser;

    logger.log({
        message: `Launching '${browser}' on ${gDriver}`,
        emoji: 'star2',
    });

    logger.log({
        message: `Host: ${process.env.HOST}`,
        emoji: 'earth_americas',
    });

    return merge(
        merge(master_conf, conf),
        require('codeceptjs-saucelabs').config.saucelabs(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_KEY || process.env.SAUCE_ACCESS_KEY
        )
    );
};

module.exports = { create };
