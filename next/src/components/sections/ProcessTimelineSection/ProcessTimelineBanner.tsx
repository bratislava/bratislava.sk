import { Button, Typography } from '@bratislava/component-library'
import { flushSync } from 'react-dom'

import Icon from '@/src/components/common/Icon/Icon'
import { useProcessTimeline } from '@/src/components/sections/ProcessTimelineSection/ProcessTimelineContext'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=5071-6410
 */

const ProcessTimelineBanner = () => {
  const { t } = useTranslation()

  const { currentItem } = useProcessTimeline()

  if (!currentItem) return null

  const { title, period, anchorId } = currentItem

  const scrollToCurrentSubstep = () => {
    const currentItemElement = document.getElementById(anchorId)

    // Expand the current substep if the user collapsed it.
    // Inside a substep anchor, the first `aria-expanded` button
    // is its disclosure trigger (DisclosureHeader).
    const disclosureTriggerButton =
      currentItemElement?.querySelector<HTMLButtonElement>('button[aria-expanded]')

    if (
      // A step anchor would match its first substep instead,
      // hence the `disclosureId` check.
      currentItem.disclosureId &&
      disclosureTriggerButton?.getAttribute('aria-expanded') === 'false'
    ) {
      // Flush synchronously so the scroll position is computed with the panel already open
      flushSync(() => disclosureTriggerButton.click())
    }

    currentItemElement?.scrollIntoView({ block: 'start' })

    // Move focus along with the scroll, so keyboard and screen reader users continue from there.
    // For a substep, focus its disclosure trigger, for a step the step itself (tabIndex={-1}).
    const focusTarget = currentItem.disclosureId ? disclosureTriggerButton : currentItemElement
    focusTarget?.focus({ preventScroll: true })
  }

  return (
    <div className="group relative flex flex-col items-start gap-3 rounded-2xl border-2 border-border-active-primary-hover bg-background-passive-base p-4 hover:bg-background-passive-primary lg:flex-row lg:items-center lg:gap-6 lg:p-6">
      <div className="flex shrink-0 items-center gap-2 rounded-full bg-background-passive-secondary px-3 py-1.5 text-content-passive-secondary group-hover:bg-background-passive-inverted-base group-hover:text-content-passive-inverted-primary">
        <Typography variant="p-default" className="font-medium whitespace-nowrap">
          {t('ProcessTimeline.current')}
        </Typography>
        {period ? (
          <>
            <div className="size-0.75 shrink-0 rounded-full bg-current" aria-hidden />
            <Typography variant="p-default" as="span" className="font-medium">
              {period}
            </Typography>
          </>
        ) : null}
      </div>
      <Typography variant="h4" as="p" className="grow">
        {title}
      </Typography>
      <Button
        variant="plain"
        onPress={scrollToCurrentSubstep}
        endIcon={<Icon name="arrow-down-small" />}
        stretched
        aria-label={t('ProcessTimeline.aria.scrollToCurrent', { title })}
        className="shrink-0 whitespace-nowrap"
      >
        {t('ProcessTimeline.details')}
      </Button>
    </div>
  )
}

export default ProcessTimelineBanner
