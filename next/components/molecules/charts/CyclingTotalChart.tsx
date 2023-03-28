// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getLocalMonthName } from '@utils/local-date'
import { FetchOpenDataResult } from 'backend/utils/opendata'
import * as React from 'react'

import OpenDataChart, { ISeries } from './OpenDataChart'

const MONTHS = 12

interface IProps {
  className?: string
  location: string
  direction: string
  title: string
  label: string
}

const CyclingTotalChart = ({ className, location, direction, ...rest }: IProps) => {
  const [cyclingData, setCyclingData] = React.useState<FetchOpenDataResult['data']>()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fetchCyclingData = async () => {
    const res = await fetch('/api/cycling')
    const data: FetchOpenDataResult = await res.json()
    return data.data
  }

  React.useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCyclingData()
      .then(setCyclingData)

      .then(() => setLoading(false))
      .catch((error_) => {
        setError(error_)
        setLoading(false)
      })
  }, [])

  const filteredData =
    cyclingData?.filter((d) => d.name.startsWith(`${location}-${direction}`)) ?? []

  const totalSeries: ISeries[] = filteredData.map((dataByYear) => {
    const year = dataByYear.name.slice(Math.max(0, dataByYear.name.lastIndexOf('-') + 1))

    return {
      name: year,
      data: [...Array.from({ length: MONTHS })].map((_, ix) => [
        ix + 1,
        dataByYear.jsonData[ix + 1]?.total ?? 0,
      ]),
    }
  })
  const sortedTotalSeries = totalSeries.reverse()

  const queryProps = { loading, error }

  const colors = ['#BFD6F6', '#8DBDFF', '#4A91F2', '#4A91F2', '#174E90', '#002047']

  return (
    <OpenDataChart
      className={className}
      series={sortedTotalSeries}
      colors={colors}
      {...rest}
      description="Celkovo"
      subdescription="Počet prejazdov"
      {...queryProps}
      options={{
        yaxis: {
          tickAmount: 8,
        },
      }}
      xMin={1}
      xMax={MONTHS}
      xAxisFormatter={getLocalMonthName}
    >
      <div className="flex justify-end">
        <span className="text-p3-bold py-2 px-3">{direction}</span>
      </div>
    </OpenDataChart>
  )
}

export default CyclingTotalChart
