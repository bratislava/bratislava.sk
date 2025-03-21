import React from 'react'

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/src/assets/images'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { SocialMediaButton } from '@/src/components/page-contents/BlogPostPageContent'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  twitterTitle?: string | null | undefined
}

const ShareButtonsSection = ({ twitterTitle }: Props) => {
  const { t } = useTranslation()

  const twitterTextQuery = twitterTitle ? `&text=${twitterTitle}` : ''

  return (
    <SectionContainer className="mb-8">
      <div className="mt-14 flex flex-col">
        {/* FIXME Typography. Convert to use Typography. Issue: different size than Figma span */}
        <span className="text-h5">{t('ShareButtonsSection.share')}</span>
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

export default ShareButtonsSection
