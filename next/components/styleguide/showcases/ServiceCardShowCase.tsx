import React from 'react'

import ContainerLogoIcon from '../../forms/icon-components/ContainerLogoIcon'
import InvestmentLogoIcon from '../../forms/icon-components/InvestmentLogoIcon'
import PropertyLogoIcon from '../../forms/icon-components/PropertyTaxLogoIcon'
import SwimmingPoolsLogoIcon from '../../forms/icon-components/SwimmingPoolsLogoIcon'
import ServiceCard from '../../forms/simple-components/ServiceCard'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ServiceCardShowCase = () => {
  return (
    <Wrapper direction="column" title="Service Card">
      <Stack>
        <div className="flex overflow-x-scroll scrollbar-hide">
          <ServiceCard
            title="Záväzné stanovisko k investičnej činnosti"
            description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade.Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
            Logo={InvestmentLogoIcon}
            buttonText="Prejsť na formulár"
            iconFill="#C4EFCE"
          />
          <ServiceCard
            title="Dotácia na kontajnerové stanovištia"
            description="Požiadajte o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
            Logo={ContainerLogoIcon}
            buttonText="Prejsť na formulár"
            iconFill="#C4EFCE"
          />
          <ServiceCard
            title="Daň z nehnuteľností"
            description="Podajte priznanie k dani z nehnuteľností digitálne. Vyrúbenú daň môžete zaplatiť online cez QR kód, alebo platobným prevodom."
            Logo={PropertyLogoIcon}
            buttonText="Prejsť na formulár"
            iconFill="#F8D7D4"
          />
          <ServiceCard
            title="Letné kúpaliská"
            description="Zakúpte si lístok alebo permanentku online a užívajte si leto na ktoromkoľvek z našich kúpalísk v Bratislave."
            Logo={SwimmingPoolsLogoIcon}
            buttonText="Prejsť na formulár"
            iconFill="#D9D9D9"
          />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default ServiceCardShowCase
