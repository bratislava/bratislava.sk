import { Typography } from '@bratislava/component-library'

export type NoResultsFoundProps = {
  title: string
  message: string
  messageClassName?: string
}

export const NoResultsFound = ({ title, message, messageClassName }: NoResultsFoundProps) => (
  <div className="mt-6 flex flex-col items-center">
    <img src="/NoResults-Found_300px.png" alt="" />
    {/* FIXME Typography. Convert to use Typography. Issue: Header size for not header element */}
    <span className="text-h3 pb-4">{title}</span>
    <Typography type="p" size="p-large" className={messageClassName}>
      {message}
    </Typography>
  </div>
)
