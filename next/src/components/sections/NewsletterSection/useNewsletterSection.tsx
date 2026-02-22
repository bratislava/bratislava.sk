import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

import {
  Enum_Componentsectionsnewsletter_Newslettertype,
  NewsletterSectionFragment,
} from '@/src/services/graphql'
import { useTranslation } from '@/src/utils/useTranslation'

const NEWSLETTER_ENDPOINTS_MAP: Record<Enum_Componentsectionsnewsletter_Newslettertype, string> = {
  starz: '/api/newsletter-starz/subscribe',
}

export const useNewsletterSection = (section: NewsletterSectionFragment) => {
  const { t } = useTranslation()
  const { newsletterType } = section

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string>()
  const [nameErrorMessage, setNameErrorMessage] = useState<string>()
  const [surnameErrorMessage, setSurnameErrorMessage] = useState<string>()
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>()

  const [statusMessage, setStatusMessage] = useState<string>()
  const [successMessage, setSuccessMessage] = useState<string>()

  const clearMessages = () => {
    setErrorMessage('')
    setNameErrorMessage('')
    setSurnameErrorMessage('')
    setEmailErrorMessage('')
    setStatusMessage('')
    setSuccessMessage('')
  }

  const subscribeToNewsletterMutation = useMutation({
    mutationFn: (payload: { email: string; name: string; surname: string }) =>
      axios.post(
        NEWSLETTER_ENDPOINTS_MAP[newsletterType],
        {
          email: payload.email,
          name: payload.name,
          surname: payload.surname,
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

  const handleSubmit = () => {
    const VALID_EMAIL_FORMAT = /.*@.*\..*/
    let isValid = true

    clearMessages()

    if (name.length === 0) {
      setNameErrorMessage(t('NewsletterSection.error.mandatoryField'))
      isValid = false
    }
    if (surname.length === 0) {
      setSurnameErrorMessage(t('NewsletterSection.error.mandatoryField'))
      isValid = false
    }
    if (email.length === 0) {
      setEmailErrorMessage(t('NewsletterSection.error.mandatoryField'))
      isValid = false
    }
    if (email.length > 0 && !VALID_EMAIL_FORMAT.test(email.toLowerCase())) {
      setEmailErrorMessage(t('NewsletterSection.error.emailIncorrectFormat'))
      isValid = false
    }
    if (!consentChecked) {
      setErrorMessage(t('NewsletterSection.error.consentRequired'))
      isValid = false
    }

    if (!isValid) {
      return
    }

    setStatusMessage(t('NewsletterSection.sending'))

    subscribeToNewsletterMutation.mutate({
      email,
      name,
      surname,
    })
  }

  return {
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
  }
}
