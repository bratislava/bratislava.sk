import { Button, Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { useId } from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import Checkbox from '@/src/components/common/CheckBoxGroup/Checkbox'
import MLink from '@/src/components/common/MLink/MLink'
import TextField from '@/src/components/fields/TextField'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  responseMessage: string
  isSubscribeSuccessful: boolean
  isSubscribePending: boolean
}

/**
 * Based on City Gallery: https://github.com/bratislava/gmb.sk/blob/master/next/src/components/molecules/sections/NewsletterSection.tsx
 */

const NewsletterTextField = ({
  name,
  label,
  type = 'text',
  isRequired,
  className,
}: {
  name: string
  label: string
  type?: string
  isRequired?: boolean
  className?: string
}) => {
  const methods = useFormContext()
  const { errors } = useFormState()

  return (
    <Controller
      control={methods.control}
      name={name}
      defaultValue=""
      render={({ field }) => {
        const message = errors[name]?.message

        return (
          <TextField
            id={`newsletter-${name}`}
            type={type}
            isRequired={isRequired}
            label={label}
            labelSize='h6'
            className={className}
            errorMessage={typeof message === 'string' ? message : undefined}
            {...field}
          />
        )
      }}
    />
  )
}

const Newsletter = ({
  onSubmit,
  responseMessage,
  isSubscribeSuccessful,
  isSubscribePending,
}: Props) => {
  const { t } = useTranslation()

  const methods = useFormContext()
  const { errors } = useFormState()

  const consentLabelId = useId()

  const { general } = useGeneralContext()
  const privacyPolicyPage = general?.privacyPolicyPage

  return (
    <div className="min-w-122 lg:max-w-122 lg:rounded-lg lg:border lg:p-8">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
            <NewsletterTextField name="firstName" label={t('Newsletter.firstName')} isRequired />
            <NewsletterTextField name="lastName" label={t('Newsletter.lastName')} isRequired />
          </div>
          <NewsletterTextField name="email" type="email" label={t('Newsletter.email')} isRequired />

          <Controller
            control={methods.control}
            name="acceptTerms"
            defaultValue={false}
            render={({ field: { onChange, value, name } }) => (
              <div className="flex flex-col gap-2">
                <div className="flex gap-3.5">
                  <Checkbox
                    id="acceptTerms"
                    name={name}
                    onChange={onChange}
                    isSelected={value}
                    isInvalid={!!errors.acceptTerms}
                    aria-labelledby={consentLabelId}
                    validationBehavior="aria"
                    className="-m-3 grow-0 p-3"
                  />
                  <Typography variant="p-small" as="span" id={consentLabelId}>
                    {t('Newsletter.consent')}
                    <MLink
                      variant="underlined"
                      href={getLinkProps({ page: privacyPolicyPage })}
                      target="_blank"
                    >
                      {t('Newsletter.consent.privacyPageLink.label')}
                    </MLink>
                  </Typography>
                </div>
                {!!errors.acceptTerms && (
                  <Typography variant="p-small" className="text-content-error-default">
                    {t('Newsletter.consent.error')}
                  </Typography>
                )}
              </div>
            )}
          />

          {responseMessage ? (
            <Typography
              variant="p-default"
              // role="status" helps screen readers see that this message changed after form submission
              role="status"
              className={cn({
                'text-content-success-default': isSubscribeSuccessful,
                'text-content-error-default': !isSubscribeSuccessful,
              })}
            >
              {responseMessage}
            </Typography>
          ) : null}

          <Button
            variant="solid"
            onPress={() => {
              // Our Button component doesn't support type="submit", so we handle form submission manually here
              void onSubmit()
            }}
            isDisabled={isSubscribePending}
          >
            {isSubscribePending
              ? t('Newsletter.submitButton.pending')
              : t('Newsletter.submitButton')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Newsletter
