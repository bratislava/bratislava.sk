import { useQuery } from '@tanstack/react-query'
import React, { forwardRef, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import cn from 'utils/cn'

import { AlertIcon, CrossIcon } from '@/assets/ui-icons'
import Button from '@/components/common/Button/Button'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import Markdown from '@/components/formatting/Markdown/Markdown'
import { client } from '@/services/graphql/gql'
import { useLocale } from '@/utils/useLocale'

const AlertBanner = forwardRef<HTMLDivElement>((props, forwardedRef) => {
  const locale = useLocale()

  const storageKey = `bratislava-sk-dismissible-alert-timestamp`

  const { data } = useQuery({ queryKey: ['AlertBanner'], queryFn: () => client.Alert({ locale }) })
  const { alert } = data ?? {}
  const { text, updatedAt } = alert?.data?.attributes ?? {}

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
        // 'animate-scaleY': showAlert,
      })}
    >
      <SectionContainer>
        <div className="flex gap-3 py-3 lg:items-center lg:py-4">
          <AlertIcon className="shrink-0" />
          <div className="grow">
            <Markdown content={text} variant="small" />
          </div>
          {/* TODO translation */}
          <Button
            className="-m-3 h-fit shrink-0 p-3 lg:-m-4 lg:p-4"
            icon={<CrossIcon />}
            aria-label="Zavrieť upozornenie"
            onPress={() => handleClose()}
          />
        </div>
      </SectionContainer>
    </div>
  )
})

export default AlertBanner
