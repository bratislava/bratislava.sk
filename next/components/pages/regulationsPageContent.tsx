import { RegulationTest1EntityFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import RegulationDetail from '@components/pages/RegulationDetailPage/RegulationDetail'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

type RegulationProps = {
  data: RegulationTest1EntityFragment
}

const CUSTOM_ID = '9_392'

const RegulationsPageContent = () => {
  const t = useTranslations()
  // const { data: regulations }: RegulationsProps = useQuery({
  //   queryKey: ['regulations'],
  //   queryFn: () => client.allRegulationTest1s(),
  //   select: (res) => res.regulationtest1S.data,
  // })
  const { data: regulation }: RegulationProps = useQuery({
    queryKey: ['regulation'],
    queryFn: () => client.RegulationById({ id: CUSTOM_ID }),
    select: (res) => res.regulationtest1.data,
  })

  return (
    <SectionContainer className="my-8">
      <div className="flex flex-col gap-12">
        <div className="w-full border border-gray-100 px-2 py-3 text-center">
          Displaying {regulation?.attributes?.title ?? 'no regulation because we did not find it'}{' '}
          with id {regulation.id ?? 'none'}
        </div>
        <RegulationDetail regulation={regulation} />
      </div>
    </SectionContainer>
  )
}

export default RegulationsPageContent
