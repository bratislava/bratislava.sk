import { Typography } from '@bratislava/component-library'

import { DisclosureTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import {
  getStepAnchorId,
  ProcessTimelineStepItem,
  useProcessTimeline,
} from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineContext'
import ProcessTimelineSubstep from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineSubstep'

type Props = {
  step: ProcessTimelineStepItem
  stepIndex: number
  titleLevel?: DisclosureTitleLevel
}

const stepToSubstepTitleLevelMap = {
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
} as const

const ProcessTimelineStep = ({ step, stepIndex, titleLevel = 'h2' }: Props) => {
  const { title, period, substeps } = step
  const stepNumber = stepIndex + 1

  const { currentItem } = useProcessTimeline()

  return (
    <div
      id={getStepAnchorId(step)}
      // tabIndex={-1} lets the banner move focus here when the current item is a step
      tabIndex={-1}
      className="flex flex-col gap-2 py-4 outline-none lg:gap-4 lg:py-6"
    >
      {/* Screen: Desktop */}
      <div className="max-lg:hidden">
        <div className="flex items-center gap-8">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background-passive-inverted-base text-white">
            <Typography variant="h4" as="span">
              {stepNumber}
            </Typography>
          </div>
          <div className="flex flex-row gap-6">
            <Typography variant="h4" as="span">
              {period}
            </Typography>
            <Typography variant="h4" as={titleLevel}>
              {title}
            </Typography>
          </div>
        </div>
      </div>
      {/* Screen: Mobile */}
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-passive-inverted-base text-white">
            <Typography variant="h4" as="span">
              {stepNumber}
            </Typography>
          </div>
          <Typography variant="h4" as="span">
            {period}
          </Typography>
        </div>
        <Typography variant="h4" as={titleLevel}>
          {title}
        </Typography>
      </div>
      <div className="lg:pl-20">
        {substeps.length > 0 ? (
          <DisclosureGroup
            variant="unstyled"
            defaultExpandedKeys={currentItem?.disclosureId ? [currentItem.disclosureId] : undefined}
          >
            {substeps.map((substep, index) => (
              <ProcessTimelineSubstep
                key={substep.id}
                substep={substep}
                stepIndex={stepIndex}
                substepIndex={index}
                titleLevel={stepToSubstepTitleLevelMap[titleLevel]}
              />
            ))}
          </DisclosureGroup>
        ) : null}
      </div>
    </div>
  )
}

export default ProcessTimelineStep
