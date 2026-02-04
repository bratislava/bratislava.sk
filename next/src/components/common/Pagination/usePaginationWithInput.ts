import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'

const handleKeyDown: KeyboardEventHandler = (event) => {
  if (['e', 'E', '+', '-', '.', ','].includes(event.key)) {
    // Even if input is of type 'number', these symbols are allowed, so we disallow them here
    // TODO This may be an accessibility issue because user doesn't get feedback about input rejection
    event.preventDefault()
  }
}

export const usePaginationWithInput = ({
  currentPage,
  totalCount,
  handlePageChange,
}: {
  currentPage: number
  totalCount: number
  handlePageChange: (value: number) => void
}) => {
  // inputValue is detached from currentPage to allow empty input value without changing currentPage
  const [inputValue, setInputValue] = useState<string>(String(currentPage))

  useEffect(() => {
    setInputValue(String(currentPage))
  }, [currentPage])

  const getValidValue = (incomingValue: HTMLInputElement['value']) => {
    const incomingNumberValue = Number(incomingValue)

    if (incomingValue === '') {
      return ''
    }
    if (Number.isNaN(incomingNumberValue)) {
      return String(currentPage)
    }
    if (incomingNumberValue > totalCount) {
      return String(totalCount)
    }
    if (incomingNumberValue < 1) {
      return '1'
    }

    const normalizedValue = Number.isInteger(incomingNumberValue)
      ? incomingNumberValue
      : Math.floor(incomingNumberValue)

    return String(normalizedValue)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const validValue = getValidValue(event.currentTarget.value)

    if (validValue !== inputValue) {
      setInputValue(validValue)
    }

    if (validValue !== '') {
      handlePageChange(Number(validValue))
    }
  }

  return { inputValue, handleChange, handleKeyDown }
}
