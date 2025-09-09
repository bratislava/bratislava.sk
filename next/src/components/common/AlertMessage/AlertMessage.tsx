import { Typography } from '@bratislava/component-library'

import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Markdown from '@/src/components/formatting/Markdown/Markdown'

type Props = {
  title: string
  titleLevel?: CardTitleLevel
  text?: string | null | undefined
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-12976&m=dev
 */

const AlertMessage = ({ title, titleLevel, text }: Props) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-background-warning-soft-default p-4">
      <Typography variant="h6" as={titleLevel}>
        {title}
      </Typography>
      {text ? <Markdown variant="small" content={text} /> : null}
    </div>
  )
}

export default AlertMessage
