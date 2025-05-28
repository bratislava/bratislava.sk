import { Typography } from '@bratislava/component-library'

import StrapiImage from '@/src/components/common/Image/StrapiImage'
import MLink from '@/src/components/common/MLink/MLink'
import { PartnersSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

type Props = {
  section: PartnersSectionFragment
}

const PartnersSection = ({ section }: Props) => {
  const { title, text, partners, logoRatio } = section

  const filteredPartners = partners.filter(isDefined)
  const count = filteredPartners.length

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography variant="h2">{title}</Typography>}
          {text && <Typography variant="p-default">{text}</Typography>}
        </div>
      ) : null}

      <div
        className={cn('grid gap-6 gap-y-4 lg:gap-12', {
          'grid-cols-1': logoRatio === 'ratio_4_1',
          'grid-cols-2': logoRatio === 'ratio_4_3',
          'lg:grid-cols-2': count <= 2,
          'lg:grid-cols-3': count === 3,
          'lg:grid-cols-4': count === 4,
          'lg:grid-cols-5': count === 5,
          'lg:grid-cols-6': count >= 6,
        })}
      >
        {filteredPartners.map((partner, index) => {
          const Logo = () =>
            partner.logo.data?.attributes ? (
              <StrapiImage
                alt={`Logo ${partner.title}`}
                image={partner.logo.data.attributes}
                sizes={imageSizes}
                fill
                className="object-contain"
              />
            ) : null

          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cn('relative grow', {
                'aspect-4/3': logoRatio === 'ratio_4_3',
                'aspect-4/1': logoRatio === 'ratio_4_1',
              })}
            >
              {partner.url ? (
                <MLink
                  href={partner.url}
                  target="_blank"
                  aria-label={partner.title}
                  className="transition hover:opacity-80"
                >
                  <Logo />
                </MLink>
              ) : (
                <Logo />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PartnersSection
