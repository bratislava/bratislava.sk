import React from 'react'

import ContainerLogo from '../../../assets/images/container-logo.svg'
import InvestmentLogo from '../../../assets/images/investment-logo.svg'
import PropertyTaxLogo from '../../../assets/images/property-tax-logo.svg'
import SwimmingPoolsLogo from '../../../assets/images/swimming-pools-logo.svg'
import ServiceCard from '../../forms/simple-components/ServiceCard'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ServiceCardShowCase = () => {
  return (
    <Wrapper direction="column" title="Spinner">
      <Stack direction="row">
        <ServiceCard
          title="Záväzné stanovisko k investičnej činnosti"
          description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
          Logo={InvestmentLogo}
          buttonText="Prejsť na formulár"
          href="https://bratislava-next.staging.bratislava.sk"
          target="_blank"
        />
        <ServiceCard
          title="Dotácia na kontajnerové stanovištia"
          description="Požiadajte o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
          Logo={ContainerLogo}
          buttonText="Prejsť na formulár"
          href="https://bratislava-next.staging.bratislava.sk"
        />
        <ServiceCard
          title="Daň z nehnuteľností"
          description="Podajte priznanie k dani z nehnuteľností digitálne. Vyrúbenú daň môžete zaplatiť online cez QR kód, alebo platobným prevodom."
          Logo={PropertyTaxLogo}
          buttonText="Prejsť na formulár"
          href="https://bratislava-next.staging.bratislava.sk"
        />
        <ServiceCard
          title="Letné kúpaliská"
          description="Zakúpte si lístok alebo permanentku online a užívajte si leto na ktoromkoľvek z našich kúpalísk v Bratislave."
          Logo={SwimmingPoolsLogo}
          buttonText="Prejsť na formulár"
          href="https://bratislava-next.staging.bratislava.sk"
        />
      </Stack>
    </Wrapper>
  )
}

export default ServiceCardShowCase
