import { Typography } from '@bratislava/component-library'
import React from 'react'

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/src/assets/icons-social-media'
import Button, { PolymorphicProps } from '@/src/components/common/Button/Button'
import Checkbox from '@/src/components/common/CheckBoxGroup/Checkbox'
import Input from '@/src/components/common/Input/Input'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { NewsletterSectionFragment } from '@/src/services/graphql'
import { useTranslation } from '@/src/utils/useTranslation'
import MLink from '@/src/components/common/MLink/MLink'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useNewsletterSection } from './useNewsletterSection'

type Props = {
  section: NewsletterSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18641-16591
 * Based on City Gallery: https://github.com/bratislava/gmb.sk/blob/master/next/src/components/molecules/sections/NewsletterSection.tsx
 */

const NewsletterSection = ({ section }: Props) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const privacyPolicyPage = general?.privacyPolicyPage

  const { title, text, socialLinksTitle, facebookUrl, instagramUrl, linkedinUrl, youtubeUrl } =
    section

  // TODO proper error handling and form validation
  const {
    name,
    setName,
    surname,
    setSurname,
    email,
    setEmail,
    consentChecked,
    setConsentChecked,
    errorMessage,
    nameErrorMessage,
    surnameErrorMessage,
    emailErrorMessage,
    statusMessage,
    successMessage,
    handleSubmit,
  } = useNewsletterSection(section)

  const socialMediaButtonsCommonProps = {
    target: '_blank',
    rel: 'noreferrer',
    variant: 'icon-wrapped',
    hasLinkIcon: false,
    className: 'size-10 bg-background-passive-primary lg:size-12',
  } satisfies PolymorphicProps

  return (
    <SectionContainer className="lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-34">
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
        <div className="flex grow flex-col gap-4 lg:min-w-100 lg:gap-6 lg:rounded-lg lg:border lg:p-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <Input
                value={name}
                label={t('NewsletterSection.nameLabel')}
                onChange={(event) => setName(event.target.value)}
                errorMessage={nameErrorMessage}
              />
              <Input
                value={surname}
                label={t('NewsletterSection.surnameLabel')}
                onChange={(event) => setSurname(event.target.value)}
                errorMessage={surnameErrorMessage}
              />
            </div>
            <Input
              value={email}
              label={t('NewsletterSection.inputLabel')}
              onChange={(event) => setEmail(event.target.value)}
              errorMessage={emailErrorMessage}
            />
            <div className="flex gap-1">
              {/**
               * Checkbox label and link are separated for accessibility reasons:
               * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label#interactive_content
               */}
              <Checkbox
                isSelected={consentChecked}
                onChange={setConsentChecked}
                aria-label={[
                  t('NewsletterSection.consentCheckboxLabel'),
                  t('NewsletterSection.consentLinkLabel'),
                ].join(' ')}
              >
                {t('NewsletterSection.consentCheckboxLabel')}{' '}
              </Checkbox>
              <MLink
                variant="underlined"
                aria-label={t('NewsletterSection.consentLinkLabel.aria')}
                {...getLinkProps({ page: privacyPolicyPage })}
              >
                {t('NewsletterSection.consentLinkLabel')}
              </MLink>
            </div>
            {successMessage ? (
              <Typography variant="p-small" className="text-content-success-default">
                {successMessage}
              </Typography>
            ) : null}
            {errorMessage ? (
              <Typography variant="p-small" className="text-content-error-default">
                {errorMessage}
              </Typography>
            ) : null}
            {statusMessage ? (
              <Typography variant="p-small" className="text-content-info-default">
                {statusMessage}
              </Typography>
            ) : null}
          </div>
          <Button variant="solid" onPress={() => void handleSubmit()}>
            {t('NewsletterSection.subscribeButton')}
          </Button>
        </div>
      </div>
    </SectionContainer>
  )
}

export default NewsletterSection
