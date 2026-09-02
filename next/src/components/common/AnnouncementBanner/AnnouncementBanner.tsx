import { Button, Typography } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import { CommonLinkFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title?: string
  text?: string
  link?: CommonLinkFragment
}

const AnnouncementBanner = ({ title, text, link }: Props) => {
  return (
    <div className="flex w-full flex-row justify-between gap-6 rounded-xl bg-black p-8 text-white">
      <Icon name="info" className="size-6" />

      <div className="flex flex-1 flex-row justify-between">
        <div className="flex max-w-170 flex-col gap-2">
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
            endIcon={<Icon name="arrow-right" />}
            className="rounded-lg bg-white px-4 py-3 text-black"
            {...getLinkProps(link)}
          />
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBanner
