import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import * as React from 'react'

import CyclingTotalChart from '../components/molecules/charts/CyclingTotalChart'

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type StaticProps = Awaited<ReturnType<typeof getServerSideProps>>['props']

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

const CyclingChartspage = ({}: StaticProps) => {
  return (
    <SectionContainer>
      <CyclingTotalChart
        location="BA-Viedenska"
        direction="Obojsmerne"
        title="Celkový počet prejazdov bicyklom k Starému mostu a k Novému mostu na Viedenskej ceste podľa mesiacov"
        label="Viedenská"
      />

      <CyclingTotalChart
        className="mt-28"
        location="BA-Viedenska"
        direction="DoSlovenska"
        title="Celkový počet prejazdov bicyklom k Starému mostu a k Novému mostu na Viedenskej ceste podľa mesiacov"
        label="Viedenská"
      />

      <CyclingTotalChart
        className="mt-28"
        location="BA-Berg"
        direction="kMostuSNP"
        title="Celkový počet prejazdov bicyklom cez Berg podľa mesiacov"
        label="Berg"
      />
    </SectionContainer>
  )
}

export default CyclingChartspage
