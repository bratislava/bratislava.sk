import { Typography } from '@bratislava/component-library'
import React, { useRef, useState } from 'react'

import { FacebookIcon, InstagramIcon } from '@/src/assets/icons-social-media'
import Button from '@/src/components/common/Button/Button'
import Input from '@/src/components/common/Input/Input'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import {
  Enum_Componentsectionsnewsletter_Newslettertype,
  NewsletterSectionFragment,
} from '@/src/services/graphql'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: NewsletterSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18641-16591&m=dev
 * Based on City Gallery: https://github.com/bratislava/gmb.sk/blob/master/next/src/components/molecules/sections/NewsletterSection.tsx
 */

const NewsletterSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [statusMessage, setStatusMessage] = useState<string>()
  const [successMessage, setSuccessMessage] = useState<string>()

  const clearMessages = () => {
    setErrorMessage('')
    setStatusMessage('')
    setSuccessMessage('')
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const { title, text, socialLinksTitle, newsletterType, facebookUrl, instagramUrl } = section

  const validateForm = () => {
    const VALID_EMAIL_FORMAT =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/

    if (email.length === 0) {
      return { isValid: false, error: t('NewsletterSection.error.emailMandatory') }
    }
    if (!VALID_EMAIL_FORMAT.test(String(email).toLowerCase())) {
      return { isValid: false, error: t('NewsletterSection.error.emailIncorrectFormat') }
    }

    return { isValid: true }
  }

  const handleSubmit = async (emailToSubscribe: string) => {
    clearMessages()

    if (!validateForm().isValid) {
      setErrorMessage(validateForm().error)
      inputRef?.current?.focus()

      return
    }

    setStatusMessage(t('NewsletterSection.sending'))

    if (newsletterType === Enum_Componentsectionsnewsletter_Newslettertype.Starz) {
      const response = await fetch('/api/newsletter-starz/subscribe', {
        body: JSON.stringify({
          email: emailToSubscribe,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { error } = await response.json()

      if (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        clearMessages()
        setErrorMessage(t('NewsletterSection.error.somethingWentWrong'))
      } else {
        clearMessages()
        setSuccessMessage(t('NewsletterSection.success'))
      }
    }
  }

  return (
    <SectionContainer className="lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-10">
        <div className="flex max-w-150 flex-col gap-6 lg:gap-10">
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
                  target="_blank"
                  variant="icon-wrapped"
                  rel="noreferrer"
                  hasLinkIcon={false}
                  className="size-10 bg-background-passive-primary lg:size-12"
                />
              ) : null}
              {instagramUrl ? (
                <Button
                  href={instagramUrl}
                  icon={<InstagramIcon />}
                  aria-label="Instagram"
                  target="_blank"
                  variant="icon-wrapped"
                  rel="noreferrer"
                  hasLinkIcon={false}
                  className="size-10 bg-background-passive-primary lg:size-12"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex max-w-122 grow flex-col gap-4 lg:gap-6 lg:rounded-lg lg:border lg:border-border-passive-primary lg:p-8">
          <div className="flex flex-col gap-2">
            <Input
              ref={inputRef}
              value={email}
              labelText={t('NewsletterSection.inputLabel')}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit(email)
                }
              }}
              errorMessage={errorMessage}
              successMessage={successMessage}
            />
            {statusMessage ? (
              <Typography variant="p-small" className="text-content-info-default">
                {statusMessage}
              </Typography>
            ) : null}
          </div>
          <Button
            variant="solid"
            onPress={() => handleSubmit(email)}
            className="ring-border-active-focused"
          >
            {t('NewsletterSection.subscribeButton')}
          </Button>
        </div>
      </div>
    </SectionContainer>
  )
}

export default NewsletterSection
