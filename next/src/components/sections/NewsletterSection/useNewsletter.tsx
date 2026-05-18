import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  Enum_Componentsectionsnewsletter_Newslettertype,
  NewsletterSectionFragment,
} from '@/src/services/graphql'

type NewsletterFormValues = {
  firstName: string
  lastName: string
  email: string
  acceptTerms: boolean
}

type SubscribePayload = Pick<NewsletterFormValues, 'email' | 'firstName' | 'lastName'>

const NEWSLETTER_ENDPOINTS_MAP: Record<Enum_Componentsectionsnewsletter_Newslettertype, string> = {
  starz: '/api/newsletter-starz/subscribe',
}

type Props = Pick<NewsletterSectionFragment, 'newsletterType'>

export const useNewsletter = ({ newsletterType }: Props) => {
  const { t } = useTranslation()

  // docs: https://www.npmjs.com/package/yup
  const schema = yup.object({
    firstName: yup.string().trim().required(t('Newsletter.firstName.error.required')),
    lastName: yup.string().trim().required(t('Newsletter.lastName.error.required')),
    email: yup
      .string()
      .trim()
      .required(t('Newsletter.email.error.required'))
      .email(t('Newsletter.email.error.invalidFormat')),
    acceptTerms: yup.boolean().isTrue(),
  })

  const methods = useForm<NewsletterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      acceptTerms: false,
    },
  })

  const [isSubscribeSuccessful, setIsSubscribeSuccessfull] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const subscribeMutation = useMutation({
    mutationFn: (payload: SubscribePayload) =>
      axios.post(NEWSLETTER_ENDPOINTS_MAP[newsletterType], payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      setIsSubscribeSuccessfull(true)
      methods.reset(undefined, { keepDefaultValues: true })
      setResponseMessage(t('Newsletter.subscribe.successMessage'))
    },
    onError: () => {
      setIsSubscribeSuccessfull(false)
      setResponseMessage(t('Newsletter.subscribe.errorMessage'))
    },
  })

  const handleSubmit = methods.handleSubmit((data) => {
    subscribeMutation.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    })
  })

  return {
    methods,
    handleSubmit,
    responseMessage,
    isSubscribeSuccessful,
    isSubscribePending: subscribeMutation.isPending,
  }
}
