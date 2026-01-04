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
    admin?: {
      user: unknown
    }
  }
  request: Context['request'] & {
    headers?: Record<string, string>
    header?: Record<string, string>
  }
}

export default (config: MiddlewareConfig, { strapi }: MiddlewareOptions) => {
  return async (ctx: AuthContext, next: Next) => {
    // Store strapi in ctx.state so controllers can access it
    ctx.state.strapi = strapi

    const headers = ctx.request.headers || ctx.request.header || {}
    const referer = typeof headers.referer === 'string' ? headers.referer : ''
    const origin = typeof headers.origin === 'string' ? headers.origin : ''
    const host = typeof headers.host === 'string' ? headers.host : ''

    // Check if this is an admin panel request
    const isAdminRequest =
      referer.includes('/admin') ||
      origin.includes('/admin') ||
      headers['x-strapi-admin'] === 'true'

    if (isAdminRequest) {
      return await next()
    }

    // Try to verify admin token if Authorization header is present
    const authHeader = typeof headers.authorization === 'string' ? headers.authorization : undefined
    if (authHeader && strapi.admin.services.token.decodeJwtToken) {
      try {
        const token = authHeader.replace(/^Bearer /, '')
        const decoded = await strapi.admin.services.token.decodeJwtToken(token)

        if (decoded.id && strapi.admin.services.user.findOne) {
          const adminUser = await strapi.admin.services.user.findOne({ id: decoded.id })
          if (adminUser) {
            ctx.state.admin = { user: adminUser }
            return await next()
          }
        }
      } catch (tokenError) {
        const message = tokenError instanceof Error ? tokenError.message : 'Unknown error'
        strapi.log.debug('Admin token verification failed:', message)
      }
    }

    // If it's a same-origin request, allow it
    if (host && (referer.includes(host) || origin.includes(host))) {
      return await next()
    }

    // Otherwise, block the request
    strapi.log.warn('Blocking request - not from admin panel and no valid token')
    return ctx.unauthorized('Admin authentication required')
  }
}
