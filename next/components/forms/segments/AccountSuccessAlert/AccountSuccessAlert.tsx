import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import SuccessIcon from '@assets/images/forms/success.svg'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import Button from 'components/forms/simple-components/Button'
import { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  confirmLabel: string
  onConfirm: () => void
  onCancel?: () => void
  cancelLabel?: string
  children?: ReactNode
}

const AccountSuccessAlert = ({
  title,
  confirmLabel,
  onConfirm,
  description,
  onCancel,
  cancelLabel,
  children,
}: Props) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="h-14 w-14 rounded-full p-4 bg-success-100 mx-auto">
        <div className="flex h-6 w-6 items-center justify-center">
          <SuccessIcon />
        </div>
      </div>
      <h1 className="text-h3 text-center">{title}</h1>
      {description && (
        <AccountMarkdown className="text-center" content={description} variant="sm" />
      )}
      {children}
      <Button onPress={onConfirm} className="min-w-full" variant="category" text={confirmLabel} />
      {onCancel && (
        <Button
          variant="plain-black"
          className="min-w-full"
          onPress={onCancel}
          text={cancelLabel}
          endIcon={<ArrowRightIcon />}
        />
      )}
    </div>
  )
}

export default AccountSuccessAlert
