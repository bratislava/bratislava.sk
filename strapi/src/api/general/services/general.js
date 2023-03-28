'use strict';

/**
 * general service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::general.general');
