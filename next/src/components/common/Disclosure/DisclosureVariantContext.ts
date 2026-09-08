import { createContext, useContext } from 'react'

import { DisclosureVariant } from '@/src/components/common/Disclosure/disclosureStyles'

/** `null` means there is no Disclosure/DisclosureGroup ancestor providing a variant */
export const DisclosureVariantContext = createContext<DisclosureVariant | null>(null)

export const useDisclosureVariant = (): DisclosureVariant =>
  useContext(DisclosureVariantContext) ?? 'boxed'
