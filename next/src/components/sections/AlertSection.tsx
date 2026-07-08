import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { AlertSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type AlertSectionProps = { section: AlertSectionFragment }

const AlertSection = ({ section }: AlertSectionProps) => {
  const { alertTitle, alertText, alertVariant, alertLinks } = section

  return (
    <SectionContainer>
      <AlertMessage
        title={alertTitle}
        variant={alertVariant}
        links={alertLinks?.filter(isDefined) ?? []}
      >
        {alertText}
      </AlertMessage>
    </SectionContainer>
  )
}

export default AlertSection
