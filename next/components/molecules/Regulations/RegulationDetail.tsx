import { RegulationTest1EntityFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Button from '@components/forms/simple-components/Button'
import Tag from '@components/forms/simple-components/Tag'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { CommonLinkProps } from '@utils/getCommonLinkProps'
import Image from 'next/image'
import React from 'react'

type RegulationDetailProps = {
  regulation: RegulationTest1EntityFragment
}

const RegulationDetail = ({ regulation }: RegulationDetailProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-2">
        <Typography type="p" size="p-small">
          {regulation?.attributes?.title}
        </Typography>
      </div>
    </div>
  )
}

export default RegulationDetail
