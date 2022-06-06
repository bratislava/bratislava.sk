'use strict';

/**
 * audience service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::audience.audience');
