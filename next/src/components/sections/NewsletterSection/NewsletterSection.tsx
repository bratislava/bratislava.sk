import { Typography } from '@bratislava/component-library'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
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
    const VALID_EMAIL_FORMAT = /.*@.*\..*/

    if (email.length === 0) {
      return { isValid: false, error: t('NewsletterSection.error.emailMandatory') }
    }
    if (!VALID_EMAIL_FORMAT.test(String(email).toLowerCase())) {
      return { isValid: false, error: t('NewsletterSection.error.emailIncorrectFormat') }
    }

    return { isValid: true }
  }

  const newsletterEndpointsMap: Record<Enum_Componentsectionsnewsletter_Newslettertype, string> = {
    starz: '/api/newsletter-starz/subscribe',
  }

  const subscribeToNewsletterMutation = useMutation({
    mutationFn: (emailToSubscribeeeee: string) =>
      axios.post(
        newsletterEndpointsMap[newsletterType],
        {
          email: emailToSubscribeeeee,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    onSuccess: () => {
      clearMessages()
      setSuccessMessage(t('NewsletterSection.success'))
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      clearMessages()
      setErrorMessage(t('NewsletterSection.error.somethingWentWrong'))
    },
  })

  const handleSubmit = async (submittedEmail: string) => {
    clearMessages()

    if (!validateForm().isValid) {
      setErrorMessage(validateForm().error)
      inputRef?.current?.focus()

      return
    }

    setStatusMessage(t('NewsletterSection.sending'))

    subscribeToNewsletterMutation.mutate(submittedEmail)
  }

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
        <div className="flex grow flex-col gap-4 lg:min-w-100 lg:gap-6 lg:rounded-lg lg:border lg:border-border-passive-primary lg:p-8">
          <div className="flex flex-col gap-2">
            <Input
              ref={inputRef}
              value={email}
              label={t('NewsletterSection.inputLabel')}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit(email)
                }
              }}
              errorMessage={errorMessage}
            />
            {successMessage ? (
              <Typography variant="p-small" className="text-content-success-default">
                {successMessage}
              </Typography>
            ) : null}
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
