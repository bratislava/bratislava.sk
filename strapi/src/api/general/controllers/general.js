'use strict';

/**
 * general controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::general.general');
