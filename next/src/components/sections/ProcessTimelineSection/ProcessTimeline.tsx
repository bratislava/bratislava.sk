import { Fragment } from 'react/jsx-runtime'

import { DisclosureTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import ProcessTimelineBanner from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineBanner'
import {
  ProcessTimelineProvider,
  useProcessTimeline,
} from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineContext'
import ProcessTimelineStep from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineStep'
import { ProcessTimelineStepFragment } from '@/src/services/graphql'

type ProcessTimelineContentProps = {
  stepTitleLevel?: DisclosureTitleLevel
  showBanner?: boolean | null
  contentUnderBanner?: string | null
}

type ProcessTimelineProps = ProcessTimelineContentProps & {
  steps: ProcessTimelineStepFragment[]
  currentStep?: number | null
  currentSubstep?: number | null
}

const ProcessTimelineContent = ({
  stepTitleLevel = 'h2',
  showBanner,
  contentUnderBanner,
}: ProcessTimelineContentProps) => {
  const { steps } = useProcessTimeline()

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      {showBanner ? <ProcessTimelineBanner /> : null}
      {contentUnderBanner ? <Markdown variant="accordion" content={contentUnderBanner} /> : null}
      <ol className="flex flex-col">
        {steps.map((step, stepIndex) => (
          <Fragment key={step.id}>
            {stepIndex > 0 && <HorizontalDivider asListItem />}
            <li>
              <ProcessTimelineStep step={step} stepIndex={stepIndex} titleLevel={stepTitleLevel} />
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

const ProcessTimeline = ({
  steps,
  currentStep,
  currentSubstep,
  stepTitleLevel,
  showBanner,
  contentUnderBanner,
}: ProcessTimelineProps) => {
  return (
    <ProcessTimelineProvider
      steps={steps}
      currentStep={currentStep}
      currentSubstep={currentSubstep}
    >
      <ProcessTimelineContent
        stepTitleLevel={stepTitleLevel}
        showBanner={showBanner}
        contentUnderBanner={contentUnderBanner}
      />
    </ProcessTimelineProvider>
  )
}

export default ProcessTimeline
