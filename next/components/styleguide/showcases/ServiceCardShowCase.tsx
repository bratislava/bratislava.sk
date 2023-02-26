import BasketServiceIcon from '@assets/images/account/basket-service-icon.svg'
import CompassServiceIcon from '@assets/images/account/compass-service-icon.svg'
import MoneyServiceIcon from '@assets/images/account/money-service-icon.svg'
import PoolServiceIcon from '@assets/images/account/pool-service-icon.svg'
import React from 'react'

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
            description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
            icon={<CompassServiceIcon />}
            buttonText="Prejsť na žiadosť"
            href="#"
          />
          <ServiceCard
            title="Dotácia na kontajnerové stanovištia"
            description="Žiadosť o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
            icon={<BasketServiceIcon />}
            buttonText="Prejsť na žiadosť"
            onPress={() => alert('Hello')}
          />
          <ServiceCard
            title="Digitálna platba dane z nehnuteľností"
            description="Digitálna platba dane z nehnuteľnosti, pohodlne a online."
            icon={<MoneyServiceIcon />}
            buttonText="Zaplatiť daň digitálne"
            href="#"
          />
          <ServiceCard
            title="Online lístky na kúpaliská"
            description="Kúpa online lístku alebo permanentky na všetky mestské kúpalíská v Bratislave."
            icon={<PoolServiceIcon />}
            buttonText="Kúpiť lístok"
            onPress={() => alert('Hello')}
          />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default ServiceCardShowCase
