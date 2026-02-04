/**
 * Middleware to verify admin authentication for pages-by-component routes
 * This middleware is lenient for admin panel requests since useFetchClient
 * may not always send Authorization headers for custom API routes
 */

import type { Core } from '@strapi/strapi'
import type { Context, Next } from 'koa'

type MiddlewareConfig = Record<string, unknown>

type MiddlewareOptions = {
  strapi: Core.Strapi
}

type AuthContext = Context & {
  state: {
    strapi: Core.Strapi
  }
}

export default (_config: MiddlewareConfig, { strapi }: MiddlewareOptions) => {
  return async (ctx: AuthContext, next: Next) => {
    ctx.state.strapi = strapi

    const headers = ctx.request.headers || ctx.request.header || {}
    const referer = String(headers.referer || '')
    const origin = String(headers.origin || '')
    const host = String(headers.host || '')

    // Allow admin panel requests
    if (
      referer.includes('/admin') ||
      origin.includes('/admin') ||
      headers['x-strapi-admin'] === 'true'
    ) {
      return await next()
    }

    // Try JWT token verification
    const authHeader = String(headers.authorization || '')
    if (authHeader && strapi.admin.services.token.decodeJwtToken) {
      try {
        const token = authHeader.replace(/^Bearer /, '')
        const decoded = await strapi.admin.services.token.decodeJwtToken(token)
        if (decoded?.id && strapi.admin.services.user.findOne) {
          const adminUser = await strapi.admin.services.user.findOne({ id: decoded.id })
          if (adminUser) {
            return await next()
          }
        }
      } catch {
        // Token verification failed, continue to next check
      }
    }

    // Allow same-origin requests
    if (host && (referer.includes(host) || origin.includes(host))) {
      return await next()
    }

    return ctx.unauthorized('Admin authentication required')
  }
}
