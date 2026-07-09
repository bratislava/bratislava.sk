import slugify from '@sindresorhus/slugify'
import { parseAsString, useQueryState } from 'nuqs'
import { Selection, TagGroup, TagList } from 'react-aria-components'

import Chip from '@/src/components/common/Chip/Chip'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Iframe from '@/src/components/common/Iframe/Iframe'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { IframeTabsSectionFragment } from '@/src/services/graphql'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = { section: IframeTabsSectionFragment }

const DEFAULT_IFRAME_HEIGHT = '400px'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=25997-18423&t=jsOAk2fAFkJeDwuF-4
 */

const IframeTabsSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const { title, text, iframesHeight, iframes, titleLevelIframeTabsSection: titleLevel } = section

  // Add slugs to tabs based on label, so url query params are readable
  const tabs = (iframes?.filter(isDefined) ?? []).map((iframe) => ({
    ...iframe,
    slug: slugify(iframe.label),
  }))

  const [selectedTabSlug, setSelectedTabSlug] = useQueryState(
    'iframeTab',
    parseAsString.withDefault(tabs[0]?.slug ?? ''),
  )

  const handleSelection = (newSelection: Selection) => {
    // Only accept a change that keeps a single selected tab, otherwise keep the current one.
    if (newSelection !== 'all' && newSelection.size === 1) {
      const [next] = newSelection
      void setSelectedTabSlug(next.toString())
    }
  }

  const selectedIframe = tabs.find((tab) => tab.slug === selectedTabSlug) ?? tabs.at(0)

  const resolvedIframeHeight =
    iframesHeight ?? selectedIframe?.iframeHeight ?? DEFAULT_IFRAME_HEIGHT

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />

        {tabs.length ? (
          <div className="flex flex-col gap-4 lg:gap-6">
            <TagGroup
              aria-label={title ?? t('IframeTabsSection.tagGroup.aria')}
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[selectedIframe?.slug ?? '']}
              onSelectionChange={handleSelection}
            >
              <TagList className="flex flex-wrap gap-2 lg:gap-3">
                {tabs.map((tab) => (
                  <Chip
                    key={tab.id}
                    id={tab.slug}
                    style={getCategoryColorLocalStyle({ category: 'grey' })}
                  >
                    {tab.label}
                  </Chip>
                ))}
              </TagList>
            </TagGroup>

            {selectedIframe ? (
              <div className="flex flex-col">
                <HorizontalDivider />
                <Iframe
                  key={selectedIframe.id}
                  url={selectedIframe.url}
                  iframeHeight={resolvedIframeHeight}
                  iframeTitle={selectedIframe.iframeTitle}
                  hasBorder={false}
                  allowGeolocation={selectedIframe.allowGeolocation}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default IframeTabsSection
