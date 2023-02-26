import { isObject } from '@utils/utils'
import cx from 'classnames'
import { FormSpacingType } from 'components/forms/types/WidgetOptions'
import React, { ReactNode, useId } from 'react'

import Accordion, { AccordionBase } from '../simple-components/Accordion'

type WidgetWrapperBase = {
  children: ReactNode
  className?: string
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
  accordion?: AccordionBase | AccordionBase[]
  id?: string
}

export const isFormSpacingType = (formSpacingType: string): formSpacingType is FormSpacingType => {
  return ['large', 'default', 'small', 'medium', 'none'].includes(formSpacingType)
}

const WidgetWrapper = ({
  children,
  className,
  accordion,
  spaceBottom = 'default',
  spaceTop = 'default',
  id,
}: WidgetWrapperBase) => {
  const generatedId = useId()
  const generatedOrProvidedId = id ?? generatedId
  return (
    <div
      className={cx('flex flex-col gap-4', className, {
        'mb-0': spaceBottom === 'none',
        'mb-10': spaceBottom === 'large',
        'mb-8': spaceBottom === 'medium',
        'mb-6': spaceBottom === 'small',
        'mb-4': spaceBottom === 'default',

        'mt-0': spaceTop === 'none',
        'mt-10': spaceTop === 'large',
        'mt-8': spaceTop === 'medium',
        'mt-6': spaceTop === 'small',
        'mt-4': spaceTop === 'default',
      })}
    >
      {children}
      {Array.isArray(accordion) &&
        accordion.map((item, index) => {
          const labelId = `${generatedOrProvidedId}-item-label-${index}`
          return (
            <Accordion
              key={labelId}
              size={item.size}
              title={item.title}
              shadow={item.shadow}
              content={item.content}
            />
          )
        })}
      {isObject(accordion) && (
        <Accordion
          size={(accordion as AccordionBase)?.size}
          title={(accordion as AccordionBase)?.title}
          shadow={(accordion as AccordionBase)?.shadow}
          content={(accordion as AccordionBase)?.content}
        />
      )}
    </div>
  )
}

export default WidgetWrapper
