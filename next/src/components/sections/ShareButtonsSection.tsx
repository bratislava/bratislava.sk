import { Typography } from '@bratislava/component-library'
import React, { PropsWithChildren } from 'react'

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/src/assets/images'
import Button from '@/src/components/common/Button/Button'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  twitterTitle?: string | null | undefined
}

const SocialMediaButton = ({
  getLink,
  children,
}: PropsWithChildren<{ getLink: (link: string) => string }>) => {
  const openSharePage = () => {
    const w = 600
    const h = 400
    const l = screen.width / 2 - w / 2
    const t = screen.height / 2 - h / 2

    window.open(
      getLink(window.location.href),
      'pop',
      `width=${w},height=${h},top=${t},left=${l},scrollbars=0`,
    )
  }

  return <Button onPress={openSharePage}>{children}</Button>
}

const ShareButtonsSection = ({ twitterTitle }: Props) => {
  const { t } = useTranslation()

  const twitterTextQuery = twitterTitle ? `&text=${twitterTitle}` : ''

  return (
    <SectionContainer className="mb-8">
      <div className="mt-14 flex flex-col">
        <Typography type="h2" size="h5">
          {t('ShareButtonsSection.share')}
        </Typography>
        <div className="flex gap-x-10 pt-5">
          <SocialMediaButton
            getLink={(socialLink) => `https://www.facebook.com/sharer/sharer.php?u=${socialLink}`}
          >
            <FacebookIcon className="size-8" />
          </SocialMediaButton>

          <SocialMediaButton
            getLink={(socialLink) =>
              `https://www.linkedin.com/sharing/share-offsite/?url=${socialLink}`
            }
          >
            <LinkedinIcon className="size-8" />
          </SocialMediaButton>

          <SocialMediaButton getLink={() => 'https://www.instagram.com/bratislava.sk/'}>
            <InstagramIcon className="size-8" />
          </SocialMediaButton>

          <SocialMediaButton
            getLink={(socialLink) =>
              `https://twitter.com/intent/tweet?url=${socialLink}${twitterTextQuery}`
            }
          >
            <TwitterIcon className="size-8" />
          </SocialMediaButton>
        </div>
      </div>
    </SectionContainer>
  )
}

export default ShareButtonsSection
