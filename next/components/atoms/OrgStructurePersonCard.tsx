// @ts-strict-ignore
import { AccordionCard } from '@bratislava/ui-bratislava/AccordionCard/AccordionCard'
import useSWR from 'swr'

import { userDetailsFetcher } from '../../backend/utils/organisationalStructure'

// TODO not used right now, but might be useful - keeping as an example
// loads data for a single person, and displays it as a accordion card
// TODO nicer loading & error handling
export const OrgStructurePersonCard = ({ email }) => {
  console.log('OrgStructurePersonCard', email)
  const { data } = useSWR(['userDetails', email], () => userDetailsFetcher(email))
  return data ? <AccordionCard {...data} /> : null
}
