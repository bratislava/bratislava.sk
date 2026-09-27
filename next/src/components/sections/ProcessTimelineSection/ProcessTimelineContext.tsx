import { createContext, ReactNode, useContext, useMemo } from 'react'

import { ProcessTimelineStepFragment, ProcessTimelineSubstepFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export const getStepAnchorId = (step: ProcessTimelineStepFragment) =>
  `process-timeline-step-${step.id}`

export const getStepDisclosureId = (step: ProcessTimelineStepFragment) =>
  `disclosure-process-timeline-step-${step.id}`

export const getSubstepAnchorId = (substep: ProcessTimelineSubstepFragment) =>
  `process-timeline-substep-${substep.id}`

export const getSubstepDisclosureId = (substep: ProcessTimelineSubstepFragment) =>
  `disclosure-process-timeline-substep-${substep.id}`

export type ProcessTimelineStatus = 'finished' | 'current' | 'upcoming'

/** Step with null substeps filtered out */
export type ProcessTimelineStepItem = Omit<ProcessTimelineStepFragment, 'substeps'> & {
  substeps: ProcessTimelineSubstepFragment[]
}

type CurrentItem = {
  title: string
  period?: string | null
  anchorId: string
  /** Only set when the current item is a substep */
  disclosureId: string | null
}

type StepPosition = {
  stepIndex: number
}

type SubstepPosition = StepPosition & {
  substepIndex: number
}

type ProcessTimelineContextType = {
  steps: ProcessTimelineStepItem[]
  /** Current substep, or the current step if no substep is set */
  currentItem: CurrentItem | null
  getStepStatus: (params: StepPosition) => ProcessTimelineStatus
  getSubstepStatus: (params: SubstepPosition) => ProcessTimelineStatus
}

const ProcessTimelineContext = createContext<ProcessTimelineContextType | null>(null)

type ProcessTimelineProviderProps = {
  children: ReactNode
  steps: ProcessTimelineStepFragment[]
  currentStep?: number | null
  currentSubstep?: number | null
}

export const ProcessTimelineProvider = ({
  children,
  steps,
  currentStep,
  currentSubstep,
}: ProcessTimelineProviderProps) => {
  const value = useMemo(() => {
    const stepItems: ProcessTimelineStepItem[] = steps.map((step) => ({
      ...step,
      substeps: step.substeps?.filter(isDefined) ?? [],
    }))

    const currentStepIndex = isDefined(currentStep) ? currentStep - 1 : null
    const currentSubstepIndex =
      isDefined(currentStepIndex) && isDefined(currentSubstep) ? currentSubstep - 1 : null

    const getCurrentItem = (): CurrentItem | null => {
      const step = isDefined(currentStepIndex) ? stepItems[currentStepIndex] : undefined
      if (!step) return null

      const substep = isDefined(currentSubstepIndex)
        ? step.substeps[currentSubstepIndex]
        : undefined

      return substep
        ? {
            title: substep.title,
            period: substep.period,
            anchorId: getSubstepAnchorId(substep),
            disclosureId: getSubstepDisclosureId(substep),
          }
        : {
            title: step.title,
            period: step.period,
            anchorId: getStepAnchorId(step),
            disclosureId: null,
          }
    }

    const getStepStatus = ({ stepIndex }: StepPosition): ProcessTimelineStatus => {
      if (!isDefined(currentStepIndex) || stepIndex > currentStepIndex) return 'upcoming'
      if (stepIndex < currentStepIndex) return 'finished'

      return 'current'
    }

    const getSubstepStatus = ({
      stepIndex,
      substepIndex,
    }: SubstepPosition): ProcessTimelineStatus => {
      const stepStatus = getStepStatus({ stepIndex })
      if (stepStatus !== 'current') return stepStatus

      if (!isDefined(currentSubstepIndex) || substepIndex > currentSubstepIndex) return 'upcoming'
      if (substepIndex < currentSubstepIndex) return 'finished'

      return 'current'
    }

    return {
      steps: stepItems,
      currentItem: getCurrentItem(),
      getStepStatus,
      getSubstepStatus,
    }
  }, [steps, currentStep, currentSubstep])

  return <ProcessTimelineContext.Provider value={value}>{children}</ProcessTimelineContext.Provider>
}

export const useProcessTimeline = () => {
  const result = useContext(ProcessTimelineContext)

  if (!result) {
    throw new Error('useProcessTimeline must be used within ProcessTimelineProvider.')
  }

  return result
}
