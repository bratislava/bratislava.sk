import { ErrorObject } from 'ajv'

interface SummaryMessagesProps {
  successMessage?: string | null
  errors?: Array<ErrorObject | string>
}

const SummaryMessages = ({ successMessage, errors }: SummaryMessagesProps) => {
  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      {!!errors?.length &&
        errors.map((error, key) => (
          <p key={key} className="text-error">
            {JSON.stringify(error)}
          </p>
        ))}
    </div>
  )
}

export default SummaryMessages
