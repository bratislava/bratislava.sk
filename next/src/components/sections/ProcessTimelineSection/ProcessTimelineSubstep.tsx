import { Button, Typography } from '@bratislava/component-library'

import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import Icon from '@/src/components/common/Icon/Icon'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import {
  getSubstepAnchorId,
  getSubstepDisclosureId,
  ProcessTimelineStatus,
  useProcessTimeline,
} from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineContext'
import { ProcessTimelineSubstepFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  substep: ProcessTimelineSubstepFragment
  stepIndex: number
  substepIndex: number
  titleLevel?: 'h3' | 'h4' | 'h5'
}

const ProcessTimelineSubstep = ({ substep, stepIndex, substepIndex, titleLevel = 'h3' }: Props) => {
  const { t } = useTranslation()

  const { title, period, content, primaryButton, secondaryButton } = substep

  const { steps, getSubstepStatus } = useProcessTimeline()

  const isFirst = substepIndex === 0
  const isLast = substepIndex === (steps[stepIndex]?.substeps.length ?? 0) - 1

  const status = getSubstepStatus({ stepIndex, substepIndex })

  const isThisSubstepCurrent = status === 'current'
  const isThisSubstepFinished = status === 'finished'
  const isPreviousSubstepFinished =
    getSubstepStatus({ stepIndex, substepIndex: substepIndex - 1 }) === 'finished'

  const statusAriaMap: Record<ProcessTimelineStatus, string | null> = {
    finished: t('ProcessTimeline.finished'),
    current: t('ProcessTimeline.current'),
    upcoming: null,
  }
  const statusAria = statusAriaMap[status]

  return (
    <div id={getSubstepAnchorId(substep)} className="flex gap-3 lg:gap-4">
      <div
        className={cn('relative top-1 flex flex-col items-center', {
          'top-4': isFirst,
        })}
      >
        {!isFirst && (
          <div
            className={cn('h-3 w-0.5 bg-border-passive-primary', {
              'bg-border-success': isPreviousSubstepFinished,
            })}
          />
        )}
        {isThisSubstepCurrent ? (
          <div
            aria-hidden
            className="size-7 shrink-0 rounded-full border-2 border-content-active-primary-default bg-content-active-primary-default bg-clip-content p-1"
          />
        ) : isThisSubstepFinished ? (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background-success-default text-content-passive-inverted-primary">
            <Icon name="check" className="size-5" />
          </div>
        ) : (
          <div className="size-7 shrink-0 rounded-full border-2 border-border-passive-primary" />
        )}
        {!isLast && (
          <div
            className={cn('w-0.5 grow bg-border-passive-primary', {
              'bg-border-success': isThisSubstepFinished,
            })}
          />
        )}
      </div>
      <Disclosure
        id={getSubstepDisclosureId(substep)}
        className="w-full rounded-lg p-4 expanded:mb-4 expanded:bg-background-passive-primary expanded:pb-2"
      >
        <DisclosureHeader>
          <div className="flex w-full flex-col-reverse gap-3 pr-6 lg:flex-row lg:justify-between">
            <Typography variant="h5" as={titleLevel}>
              {title}
            </Typography>
            <Typography variant="h5" as="span">
              {period}
            </Typography>
            {statusAria ? <span className="sr-only">{statusAria}</span> : null}
          </div>
        </DisclosureHeader>
        <DisclosurePanel
          // additional paddings ensure that focus rings of buttons are fully visible
          className="-mx-2 px-2"
          innerClassName="pb-2"
        >
          <div className="flex flex-col gap-6 pt-3">
            {content ? <Markdown content={content} variant="accordion" /> : null}

            {primaryButton || secondaryButton ? (
              <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                {primaryButton ? (
                  <Button {...getLinkProps(primaryButton)} variant="solid" fullWidthMobile />
                ) : null}
                {secondaryButton ? (
                  <Button {...getLinkProps(secondaryButton)} variant="outline" fullWidthMobile />
                ) : null}
              </div>
            ) : null}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

export default ProcessTimelineSubstep
