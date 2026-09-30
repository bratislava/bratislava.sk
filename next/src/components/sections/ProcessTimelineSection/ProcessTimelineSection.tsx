import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import ProcessTimeline from '@/src/components/sections/ProcessTimelineSection/ProcessTimeline'
import { ProcessTimelineSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: ProcessTimelineSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19100-18868&t=PIcKuCAN5fbq0HkJ-4
 */

const ProcessTimelineSection = ({ section }: Props) => {
  const {
    title,
    titleLevelProcessTimelineSection: titleLevel,
    text,
    currentStep,
    currentSubstep,
    showBanner,
    contentUnderBanner,
    steps,
  } = section

  const filteredSteps = steps?.filter(isDefined)
  const stepTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-10">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />
        {filteredSteps?.length ? (
          <ProcessTimeline
            steps={filteredSteps}
            currentStep={currentStep}
            currentSubstep={currentSubstep}
            stepTitleLevel={stepTitleLevel}
            showBanner={showBanner}
            contentUnderBanner={contentUnderBanner}
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default ProcessTimelineSection
