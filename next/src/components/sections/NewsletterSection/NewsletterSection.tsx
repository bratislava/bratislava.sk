import { Button, ButtonProps, Typography } from '@bratislava/component-library'
import { FormProvider } from 'react-hook-form'

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/src/assets/icons-social-media'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import Newsletter from '@/src/components/sections/NewsletterSection/Newsletter'
import { useNewsletter } from '@/src/components/sections/NewsletterSection/useNewsletter'
import { NewsletterSectionFragment } from '@/src/services/graphql'

type Props = {
  section: NewsletterSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18641-16591
 */

const NewsletterSection = ({ section }: Props) => {
  const {
    title,
    text,
    newsletterType,
    socialLinksTitle,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  } = section

  const { methods, handleSubmit, isSubscribeSuccessful, responseMessage, isSubscribePending } =
    useNewsletter({ newsletterType })

  const socialMediaButtonsCommonProps = {
    target: '_blank',
    rel: 'noreferrer',
    variant: 'icon-wrapped',
    hasLinkIcon: false,
    className: 'size-10 bg-background-passive-primary lg:size-12',
  } satisfies ButtonProps

  return (
    <FormProvider {...methods}>
      <SectionContainer className="py-6 lg:py-24">
        <div className="lg:gap-34 flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="flex flex-col gap-6 lg:gap-10">
            <SectionHeader title={title} text={text} />
            <div className="flex flex-col gap-4">
              <Typography variant="h5" as="p" className="font-semibold">
                {socialLinksTitle}
              </Typography>
              <div className="flex flex-wrap gap-3">
                {facebookUrl ? (
                  <Button
                    href={facebookUrl}
                    icon={<FacebookIcon />}
                    aria-label="Facebook"
                    {...socialMediaButtonsCommonProps}
                  />
                ) : null}
                {instagramUrl ? (
                  <Button
                    href={instagramUrl}
                    icon={<InstagramIcon />}
                    aria-label="Instagram"
                    {...socialMediaButtonsCommonProps}
                  />
                ) : null}
                {linkedinUrl ? (
                  <Button
                    href={linkedinUrl}
                    icon={<LinkedinIcon />}
                    aria-label="LinkedIn"
                    {...socialMediaButtonsCommonProps}
                  />
                ) : null}
                {youtubeUrl ? (
                  <Button
                    href={youtubeUrl}
                    icon={<YoutubeIcon />}
                    aria-label="Youtube"
                    {...socialMediaButtonsCommonProps}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <Newsletter
            onSubmit={handleSubmit}
            responseMessage={responseMessage}
            isSubscribeSuccessful={isSubscribeSuccessful}
            isSubscribePending={isSubscribePending}
          />
        </div>
      </SectionContainer>
    </FormProvider>
  )
}

export default NewsletterSection
