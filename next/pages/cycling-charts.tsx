import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import { GetServerSideProps } from 'next'
import React from 'react'

import CyclingTotalChart from '../components/molecules/charts/CyclingTotalChart'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

const CyclingChartspage = () => {
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
