import { NalgooJobOffersResponse } from '@/src/services/nalgoo/nalgooJobOffers.fetcher'

/**
 * Reads the job offers straight from Nalgoo, for the server side callers - the browser goes through
 * `/api/nalgoo/nalgooJobOffers` instead, so the api key never leaves the server.
 *
 * The key is read here rather than from `serverEnvironment`, whose `assertEnv` throws while the module loads - an
 * environment without the key would take down everything else importing it, instead of costing the inventory the job
 * offers alone.
 *
 * Documentation: https://doc.echoapi.com/docs/detail/3e0967471402000?target_id=2085ccd97d4002
 */
export const getNalgooJobOffers = async (): Promise<NalgooJobOffersResponse[]> => {
  const apiKey = process.env.NALGOO_API_KEY

  if (!apiKey) {
    throw new Error('Missing environment variable: NALGOO_API_KEY')
  }

  const response = await fetch(`https://ats.nalgoo.com/api/v3/organizations/${apiKey}/jobs`)

  if (!response.ok) {
    throw new Error(`Nalgoo returned ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<NalgooJobOffersResponse[]>
}
