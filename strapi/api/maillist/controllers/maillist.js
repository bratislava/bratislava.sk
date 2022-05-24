'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  send: async (ctx) => {
    // const id = ctx.params.id;
    const { id, to, from, subject, replyTo } = ctx.request.body;
    try {
      await strapi.plugins['email-designer'].services.email.send({
        templateId: id,
        to,
        from: from || strapi.plugins.email.config.settings.defaultFrom,
        replyTo: replyTo || strapi.plugins.email.config.settings.defaultReplyTo,
        subject,
      });
      return 'Succesfully sent email';
    } catch (err) {
      strapi.log.error(err);
      return ctx.badRequest(null, err);
    }
  },
};
