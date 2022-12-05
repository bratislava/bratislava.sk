'use strict';

/**
 * regulation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::regulation.regulation');
