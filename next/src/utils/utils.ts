import { environment } from '@/src/environment'

export const isProductionDeployment = () => environment.deployment === 'prod'
