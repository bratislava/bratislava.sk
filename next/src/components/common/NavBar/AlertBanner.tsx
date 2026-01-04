import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { forwardRef, useEffect, useState } from 'react'
import { AlertIcon, CrossIcon } from 'src/assets/icons'
import { useLocalStorage } from 'usehooks-ts'

import Button from '@/src/components/common/Button/Button'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { client } from '@/src/services/graphql/gql'
import cn from '@/src/utils/cn'
import { useLocale } from '@/src/utils/useLocale'

const AlertBanner = forwardRef<HTMLDivElement>((props, forwardedRef) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const storageKey = `bratislava-sk-dismissible-alert-timestamp`

  const { data } = useQuery({
    queryKey: ['AlertBanner', locale],
    queryFn: () => client.Alert({ locale }),
  })
  const { alert } = data ?? {}
  const { text, updatedAt } = alert ?? {}

  const [showAlert, setShowAlert] = useState(false)
  const [storageTimestamp, setStorageTimestamp] = useLocalStorage(storageKey, null)

  useEffect(() => {
    if (storageTimestamp !== updatedAt) {
      setShowAlert(true)
    }
  }, [storageTimestamp, updatedAt])

  if (!showAlert || !text?.length) {
    return null
  }

  const handleClose = () => {
    setStorageTimestamp(updatedAt)
    setShowAlert(false)
  }

  return (
    <div
      ref={forwardedRef}
      className={cn('bg-warning-700 text-white', {
        // TODO add some animation
        // 'animate-scale-y': showAlert,
      })}
    >
      <div className="flex gap-3 px-4 py-3 lg:items-center lg:px-8 lg:py-4">
        <AlertIcon className="shrink-0" />
        <div className="grow">
          <Markdown content={text} variant="small" />
        </div>
        <Button
          variant="icon-wrapped-negative-margin"
          className="h-fit shrink-0"
          icon={<CrossIcon />}
          aria-label={t('AlertBanner.aria.closeAlert')}
          onPress={() => handleClose()}
        />
      </div>
    </div>
  )
})

export default AlertBanner
