import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'

type InputValue = '' | number

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
  const [inputValue, setInputValue] = useState<InputValue>(currentPage)

  useEffect(() => {
    setInputValue(currentPage)
  }, [currentPage])

  const getValidValue = (incomingValue: HTMLInputElement['value']) => {
    let result: InputValue
    const incomingNumberValue = Number(incomingValue)

    if (incomingValue === '') {
      result = ''
    } else if (Number.isNaN(incomingNumberValue)) {
      result = currentPage
    } else if (incomingNumberValue > totalCount) {
      result = totalCount
    } else if (incomingNumberValue < 1) {
      result = 1
    } else {
      result = Number.isInteger(incomingNumberValue)
        ? incomingNumberValue
        : Math.floor(incomingNumberValue)
    }

    return result
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const validValue = getValidValue(event.currentTarget.value)

    if (validValue !== inputValue) {
      setInputValue(validValue)
    }

    if (validValue) {
      handlePageChange(validValue)
    }
  }

  return { inputValue, handleChange, handleKeyDown }
}
