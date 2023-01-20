import TaxesCard from 'components/forms/segments/TaxesSection/TaxesCard'

type TaxesSectionBase = {}

const TaxesSection = (props: TaxesSectionBase) => {
  return (
    <>
      <TaxesCard
        title="Daň z nehnuteľností"
        yearPay={2023}
        createDate="20. april 2023"
        currentPaid={0}
        finishPrice={58}
        status="negative"
        paidDate="20. apríl 2023"
      />
      <TaxesCard
        title="Daň z nehnuteľností"
        yearPay={2023}
        createDate="20. april 2023"
        currentPaid={19.33}
        finishPrice={58}
        status="warning"
        paidDate="20. apríl 2023"
      />
      <TaxesCard
        title="Daň z nehnuteľností"
        yearPay={2023}
        createDate="20. april 2023"
        currentPaid={0}
        finishPrice={58}
        status="success"
        paidDate="20. apríl 2023"
      />
    </>
  )
}

export default TaxesSection
