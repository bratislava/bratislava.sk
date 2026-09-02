import { Button, Typography } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { CommonLinkFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title?: string | null
  text?: string | null
  link?: CommonLinkFragment | null
}

const AnnouncementBannerSection = ({ title, text, link }: Props) => {
  return (
    <SectionContainer>
      <div className="flex w-full flex-col justify-between gap-3 rounded-xl bg-black p-8 text-white sm:flex-row sm:gap-6">
        <Icon name="info" className="size-9 max-sm:hidden" />

        <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:gap-0">
          <div className="flex max-w-170 flex-col justify-between gap-2">
            <Typography variant="h3" className="text-white">
              {title || 'Komunálne voľby 2026'}
            </Typography>

            <Typography variant="p-small" className="text-white">
              {text ||
                'Voľby do orgánov samosprávy obcí sa uskutočnia na jeseň 2026. Termín, volebné okrsky, informácieo voľbe poštou aj o kandidátoch zverejňujeme priebežne na jednej stránke.'}
            </Typography>
          </div>

          <div className="flex flex-col justify-center">
            <Button
              fullWidth
              endIcon={<Icon name="arrow-right" />}
              className="flex flex-row items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-black"
              {...getLinkProps(link)}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AnnouncementBannerSection
