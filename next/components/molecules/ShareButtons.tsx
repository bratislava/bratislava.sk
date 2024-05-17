import { useTranslations } from 'next-intl'
import React from 'react'

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/assets/images'
import { SocialMediaButton } from '@/components/pages/BlogPostPageContentTmp'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer'

type Props = {
  twitterTitle?: string | null | undefined
}

const ShareButtons = ({ twitterTitle }: Props) => {
  const t = useTranslations()

  const twitterTextQuery = twitterTitle ? `&text=${twitterTitle}` : ''

  return (
    <SectionContainer className="mb-8">
      <div className="mt-14 flex flex-col">
        {/* FIXME Typography. Convert to use Typography. Issue: different size than Figma span */}
        <span className="text-h5">{t('share')}</span>
        <div className="flex gap-x-10 pt-5">
          <SocialMediaButton
            getLink={(socialLink) => `https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}
          >
            <FacebookIcon className="h-8 w-8" />
          </SocialMediaButton>

          <SocialMediaButton
            getLink={(socialLink) =>
              `https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`
            }
          >
            <LinkedinIcon className="h-8 w-8" />
          </SocialMediaButton>

          <SocialMediaButton getLink={() => 'https://www.instagram.com/bratislava.sk/'}>
            <InstagramIcon className="h-8 w-8" />
          </SocialMediaButton>

          <SocialMediaButton
            getLink={(socialLink) =>
              `https://twitter.com/intent/tweet?url=${socialLink}${twitterTextQuery}`
            }
          >
            <TwitterIcon className="h-8 w-8" />
          </SocialMediaButton>
        </div>
      </div>
    </SectionContainer>
  )
}

export default ShareButtons
